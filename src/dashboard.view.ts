import { $, ExtJsObject } from './extjs';
import {
    Page,
    Project,
    historyEntry,
    User,
    addUserToProjectData,
    VicriEvent
} from './dashboard.model';
//@ts-ignore
const Cookie = require('js-cookie');
//@ts-ignore
const getYouTubeID = require('get-youtube-id');

export interface uploadMethods {
    video: (data: any, callback: (data: any) => void) => void;
    photo: (data: any, callback: (data: any) => void) => void;
    other: (data: any, callback: (data: any) => void) => void;
    img_uploader: (
        data: any,
        progressHandler: (data: any) => void,
        completeHandler: (data: any) => void
    ) => void;
}

export class View {
    public container: ExtJsObject;

    public page: Page;

    public buildCalendarPage(
        getEvents: (callback: (events: Array<VicriEvent>) => void) => void,
        getUserProjects: (callback: (data: Array<Project>) => void) => void,
        addNewEvent: (data: any, callback: (data: string) => void) => void
    ) {
        const firstDayInMonthIndex = (
            monthIndex = new Date().getMonth(),
            year = new Date().getFullYear()
        ) => new Date(`${year}-${monthIndex + 1}-01`).getDay();

        const daysInMonth = (
            month = new Date().getMonth() + 1,
            year = new Date().getFullYear()
        ) => new Date(year, month, 0).getDate();

        let e = this.container;

        $('.header .title').html('Calendrier');

        let calendar = e
            .child('div')
            .addClass('calendar')
            .addClass('padding')
            .addClass('panel');

        calendar
            .child('div')
            .html('Admin Panel')
            .addClass('title');

        let add = calendar
            .child('p')
            .child('button')
            .html('Nouveau');

        getEvents(event_list =>
            event_list.forEach(e => {
                let c = calendar.child('p');

                c.child('b').html(e.date);
                let i = c.child('b');
                if (e.project_id == '-1') {
                    i.html(' [Vicri] ');
                } else {
                    i.html(
                        ' [<a href="dashboard-manage-project-1" data-internal="true">Projet</a>] '
                    );
                }
                c.child('span').html(' - ' + e.title);
                c.child('i').html(' - ' + e.description);
                this.page.addUrlSwitcher();
            })
        );

        add.click(() => {
            getUserProjects(data => {
                let options: any[] = [['Site web (pour tous)', '-1']];
                data.forEach(project => {
                    options.push([project.name, project.id]);
                });
                let modal = this.createModalDialog('Ajouter un event');
                let add_to = this.buildInput(modal, 'Ajouter à ', 'select');
                let date = this.buildInput(modal, 'Date', 'date');
                let time = this.buildInput(modal, 'Heure', 'time');
                let confirm = modal
                    .child('button')
                    .addClass('button')
                    .css('float', 'right')
                    .html('Ajouter cette date au calendrier')
                    .click(() => {
                        addNewEvent({}, (result: string) => {});
                    });

                options.forEach((p: string) => {
                    let option = document.createElement('option');
                    option.value = p[1];
                    option.text = p[0];
                    add_to.get(0).add(option);
                });
                add_to.get(0).focus();
            });
        });
    }

    /**
     * Creates an admin panel
     * @param createUser
     */
    public buildAdminPage(
        createUser: (data: User, callback: (result: string) => void) => void
    ) {
        let e = this.container;

        $('.header .title').html('Admins');

        let admins = e
            .child('div')
            .css('display', 'inline-block')
            .css('vertical-align', 'top')
            .addClass('panel')
            .addClass('padding')
            .css('width', 'calc(100% - 30px)')
            .addClass('left');

        admins
            .child('div')
            .html('Admin Panel')
            .addClass('title');

        admins.child('p').html(`
                <b>Vous recevez de grands pouvoirs mais aussi de grandes responsabilités : </b><br />
                1) Toutes vos actions doivent être réalisées dans le respect de la vie privée d'autrui<br />
                2) Toutes vos actions ont des conséquences : réfléchissez avant d'agir ! (et pas l'inverse)
            `);

        let panel_users = e
            .child('div')
            .css('display', 'none')
            .css('vertical-align', 'top')
            .addClass('panel')
            .addClass('padding')
            .css('width', 'calc(100% - 30px)')
            .addClass('left');

        panel_users
            .child('div')
            .html('Gestion des utilisateurs')
            .addClass('title');

        panel_users.child('b').html(`Ajouter un utilisateur`);

        let form: ExtJsObject = panel_users.child('p');

        let firstname = this.buildInput(form, 'Prénom', 'text');
        let lastname = this.buildInput(form, 'Nom', 'text');
        let email = this.buildInput(form, 'Email', 'text', '@indse.be');
        let pseudo = this.buildInput(form, 'Pseudo', 'text');
        let password = this.buildInput(form, 'Mot de passe', 'password');
        let add = form.child('button');

        add.html('Ajouter');
        add.click(() => {
            createUser(
                {
                    firstname: firstname.value(),
                    name: lastname.value(),
                    mail: email.value(),
                    pseudo: pseudo.value(),
                    password: password.value()
                },
                (str: string) => {
                    if (str == 'ok') {
                        //@ts-ignore
                        window.location.reload();
                    } else {
                        alert(str);
                    }
                }
            );
        });

        panel_users.child('b').html('Utilisateurs actuels');

        admins
            .child('button')
            .addClass('button')
            .html('Compris, continuer')
            .click(() => {
                panel_users.css('display', 'inline-block');
                admins.remove();
            });
    }

    /**
     * Sets the menu to it's default state
     */
    public restoreMenu() {
        if (
            document.querySelector('.hamburger').classList.contains('clicked')
        ) {
            $('.hamburger').click();
        }
    }

    /**
     * Applies the theme to the website
     */
    public applyTheme() {
        if (Cookie.get('theme') == 'dark') {
            this.setDarkTheme();
        } else {
            this.setLightTheme();
        }
    }

    /**
     * Sets the global theme to dark
     */
    public setDarkTheme() {
        $('body').addClass('dark');
        Cookie.set('theme', 'dark', { expires: 60 });
        this.page.addUrlSwitcher();
    }

    /**
     * Sets the global theme to light
     */
    public setLightTheme() {
        $('body').removeClass('dark');
        Cookie.set('theme', 'light', { expires: 60 });
        this.page.addUrlSwitcher();
    }

    /**
     * Function called to clear the view
     */
    public clear() {
        this.container.html('');
    }

    /**
     * Builds the home page
     * @param getHistory Gets the history of teh website
     */
    public buildHomePage(
        getHistory: (
            id: string,
            callback: (data: Array<historyEntry>) => void
        ) => void
    ) {
        let e = this.container;

        $('.header .title').html('Home page');

        let welcome = e
            .child('div')
            .css('display', 'inline-block')
            .css('vertical-align', 'top')
            .addClass('panel')
            .addClass('padding')
            .addClass('col2')
            .addClass('left');

        welcome
            .child('div')
            .html('Bienvenue sur le dashboard vicri !')
            .addClass('title');

        welcome
            .child('p')
            .html(
                'Bienvenue sur votre tableau de bord ;-). Ici, vous retrouverez toutes les fonctions présentes sur la version précédente du site et plus encore :-).'
            );

        welcome
            .child('a')
            .addClass('button')
            .html('Découvrir les projets')
            .get(0).href =
            'projects';

        welcome
            .child('a')
            .addClass('button')
            .html('Créer un projet')
            .attr('data-internal', true)
            .get(0).href =
            'dashboard-new-project';

        welcome
            .child('a')
            .addClass('button')
            .html('PV des réunions')
            .attr('data-internal', true)
            .get(0).href =
            'dashboard-pv';

        let news = e
            .child('div')
            .css('display', 'inline-block')
            .css('vertical-align', 'top')
            .addClass('panel')
            .addClass('padding')
            .addClass('col2')
            .addClass('right');

        news
            .child('div')
            .html('Quoi de neuf ?')
            .addClass('title');

        getHistory('-1', (data: Array<historyEntry>) => {
            data.forEach(entry => {
                let container = news.child('p');

                this.buildHistory(container, entry);
            });
        });

        this.page.addUrlSwitcher();
    }

    /**
     * Builds an history with an entry
     * @param container the element in which we want to build the history
     * @param entry the entry in question
     */
    public buildHistory(container: ExtJsObject, entry: historyEntry) {
        container.child('i').html(entry.content.date + ' - ');

        if (entry.type == 'test') {
            container.child('b').html(entry.content.user + ' ');

            container
                .child('span')
                .html(" a créé une entrée dans l'historique du site vicri");
        } else if (entry.type == 'project_update') {
            container.child('b').html(entry.content.user + ' ');

            container
                .child('span')
                .html(
                    ' a mis à jour le(s) champ(s) ' +
                        entry.content.props.toString() +
                        ' de ce projet'
                );
        } else if (entry.type == 'project_created') {
            container.child('b').html(entry.content.user + ' ');

            container
                .child('span')
                .html(' a créé le projet ' + entry.content.name);
        }
    }

    /**
     * Builds an error page from an error object
     * @param error.message the message of the error
     */
    public buildErrorPage(error: Error) {
        $('.header .title').html('Erreur');

        let error_page = this.container
            .addClass('panel')
            .addClass('padding')
            .child('div')
            .addClass('error_container');

        let error_zone = error_page.child('div').addClass('error_zone');

        let error_svg = (error_zone.child('img').get(0).src = 'res/error.svg');

        error_zone.child('h1').html('Une erreur est survenue');

        error_zone.child('p').html(error.message);
    }

    /**
     * Creates an input (material design)
     * @param parent the parent container
     * @param label_text the placeholder
     * @param type the type of the input
     * @param default_value the default value
     */
    public buildInput(
        parent: ExtJsObject,
        label_text: string,
        type: string,
        default_value?: string
    ): ExtJsObject {
        let input_types = [
            'text',
            'password',
            'number',
            'range',
            'date',
            'time'
        ];
        let other_types = ['textarea', 'select'];

        let div = parent.child('div').addClass('field');

        let label = div
            .child('label')
            .addClass('top')
            .html(label_text);

        let input: ExtJsObject;

        if (input_types.indexOf(type) >= 0) {
            input = div.child('input').addClass('input');
            input.get(0).type = type;
        } else {
            input = div
                .child(type)
                .addClass('input')
                .addClass(type);
        }

        let i = input.get(0);

        i.onfocus = function() {
            this.parentElement.classList.add('focus');
            if (this.parentElement.classList.contains('notempty')) {
                this.parentElement.classList.remove('notempty');
            }
        };

        i.onblur = function() {
            if (type != 'date' && type != 'time') {
                this.parentElement.classList.remove('focus');
            }
            if (this.value != '') {
                this.parentElement.classList.add('notempty');
            }
        };

        if (default_value) input.value(default_value);

        i.onfocus();
        i.onblur();

        return input;
    }

    public createModalDialog(title: string) {
        let mask = $('body')
            .child('div')
            .addClass('mask');

        let modal = mask.child('div').addClass('modal');

        let t = modal
            .child('span')
            .html(title)
            .addClass('title');

        let cross = modal
            .child('span')
            .addClass('cross')
            .html('×');

        mask.click(e => {
            if (e.target == mask.get(0) || e.target == null) {
                mask.addClass('hidden');
                setTimeout(() => {
                    mask.remove();
                }, 1000);
            }
        });

        cross.click(() => {
            mask.click();
        });

        return modal;
    }

    /**
     * Builds a project publication dialog
     * @param project
     * @param upload
     */
    public buildPublishProjectPage(project: Project, upload: uploadMethods) {
        if (project.isPublished == true) {
            this.buildErrorPage({
                type: 'error',
                message: 'Ce projet est déjà publié'
            });
            return;
        }

        $('.header .title').html('Publier un projet');

        let e = this.container;

        let project_infos = e
            .child('div')
            .css('display', 'inline-block')
            .css('vertical-align', 'top')
            .addClass('panel')
            .addClass('padding')
            .css('width', 'calc(100% - 30px)')
            .addClass('left');

        project_infos
            .child('div')
            .html('Assistant de publication')
            .addClass('title');

        project_infos.child('b').html('<br />Type de projet : ' + project.type);

        if (project.type == 'photo') {
            project_infos
                .child('p')
                .html(
                    'Vous pourrez uploader toutes les photos sur la page suivante. Pour le moment, choisissez une photo de couverture.'
                );
        }

        let title = this.buildInput(
            project_infos,
            'Titre',
            'text',
            project.name
        );

        let short_description = this.buildInput(
            project_infos,
            'Description résumée du projet',
            'textarea',
            project.shortDescription
        );

        let url: ExtJsObject;

        let publish: ExtJsObject;

        let image_link: string;

        switch (project.type) {
            case 'video':
                url = this.buildInput(
                    project_infos,
                    'URL de la vidéo sur YouTube',
                    'text',
                    ''
                );

                url.input(() => {
                    if (!getYouTubeID(url.value())) {
                        url.css('color', 'red');
                    } else {
                        url.css('color', '');
                    }
                });

                publish = project_infos
                    .child('button')
                    .html('Publier la vidéo')
                    .click(() => {
                        project_infos.css('display', 'none');
                        if (!getYouTubeID(url.value())) {
                            project_infos.css('display', 'block');
                            alert("L'url fournie n'est pas valide");
                        } else {
                            upload.video(
                                {
                                    project_id: project.id,
                                    title: title.value(),
                                    description: short_description.value(),
                                    url: getYouTubeID(url.value())
                                },
                                data => {
                                    project_infos.css('display', 'block');
                                    if (data == 'e:r') {
                                        alert(
                                            'Une erreur est survenue lors de la communication avec le serveur'
                                        );
                                    } else if (data == 'ok') {
                                        alert(
                                            'Votre vidéo a été publiée sur le site :-)'
                                        );
                                        //@ts-ignore
                                        window.location.href = 'videos';
                                    } else {
                                        alert(data);
                                    }
                                }
                            );
                        }
                    });

                break;

            default:
                let upload_result: ExtJsObject;
                let upload_cover = project_infos
                    .child('input')
                    .attr('type', 'file')
                    .addClass('button')
                    .change(() => {
                        publish.attr('disabled', 'true').css('opacity', '0.2');

                        upload.img_uploader(
                            upload_cover.get(0).files[0],
                            (progress: ProgressEvent) => {
                                upload_result.html(
                                    'En cours : ' +
                                        100 * progress.loaded / progress.total +
                                        '%'
                                );
                            },
                            (link: string) => {
                                if (link != undefined) {
                                    upload_result.html(
                                        `Uploadé ! <br /><img style="height:150px;" src="${link}"><br />`
                                    );
                                    image_link = link;
                                    publish
                                        .css('opacity', '1')
                                        .get(0).disabled = false;
                                } else {
                                    upload_result.html('Erreur !');
                                }
                            }
                        );
                    });

                upload_result = project_infos
                    .child('span')
                    .html('Uploadez une image de couverture');

                project_infos.child('br');

                publish = project_infos
                    .child('button')
                    .html('Publier le projet')
                    .click(() => {
                        publish.attr('disabled', 'true').css('opacity', '0.2');

                        if (!image_link) {
                            alert(
                                'Uploadez une image de couverture pour illustrer le projet.'
                            );
                            return false;
                        }

                        if (project.type == 'photo') {
                            upload.photo(
                                {
                                    project_id: project.id,
                                    title: title.value(),
                                    description: short_description.value(),
                                    cover: image_link
                                },
                                data => {
                                    publish
                                        .css('opacity', '1')
                                        .get(0).disabled = false;

                                    if (data == 'e:r')
                                        return alert(
                                            'Une erreur est survenue lors de la communication avec le serveur'
                                        );

                                    if (data == 'ok')
                                        //@ts-ignore
                                        window.location.href =
                                            'dashboard-manage-images-' +
                                            project.id;
                                    else alert(data);
                                }
                            );
                        } else {
                            upload.other({}, () => {});
                        }
                    });

                break;
        }
    }

    /**
     * Makes a project maangement page
     * @param project the informations of the project
     * @param getHistory gets the history of te project
     * @param updateProject upadtes te project
     */
    public buildManageProjectPage(
        project: Project,
        getHistory: any,
        updateProject: (data: Project) => void,
        managers: [
            (func: (data: Array<User>) => void) => void,
            (
                data: addUserToProjectData,
                callback: (data?: string) => void
            ) => void,
            (
                data: addUserToProjectData,
                callback: (data?: string) => void
            ) => void
        ]
    ) {
        let e = this.container;

        $('.header .title').html('Gestion du projet');

        let project_infos = e
            .child('div')
            .css('display', 'inline-block')
            .css('vertical-align', 'top')
            .addClass('panel')
            .addClass('padding')
            .addClass('col2')
            .addClass('left');

        project_infos
            .child('div')
            .html('Gestion du projet')
            .addClass('title');

        let name = this.buildInput(
            project_infos,
            'Nom du projet',
            'text',
            project.name
        );

        let progression = this.buildInput(
            project_infos,
            'Progression du projet (en %)',
            'number',
            project.progression.toString()
        );

        let p: HTMLInputElement = progression.get(0);
        p.max = '100';
        p.min = '0';

        let type = this.buildInput(project_infos, 'Type de projet', 'select');

        let t: HTMLSelectElement = type.get(0);

        let description = this.buildInput(
            project_infos,
            'Description du projet',
            'textarea',
            project.description
        );

        let short_description = this.buildInput(
            project_infos,
            'Description résumée du projet',
            'textarea',
            project.shortDescription
        );

        let goals = this.buildInput(
            project_infos,
            'Objectifs du projet',
            'textarea',
            project.goals
        );

        let links = this.buildInput(
            project_infos,
            'Liens utiles (séparés par un retour à la ligne)',
            'textarea',
            project.links
        );

        let update = project_infos
            .child('button')
            .addClass('button')
            .html('Modifier');

        let misc = e
            .child('div')
            .css('display', 'inline-block')
            .css('vertical-align', 'top')
            .addClass('panel')
            .addClass('padding')
            .addClass('col2')
            .addClass('right');

        misc
            .child('div')
            .html('Historique et publication')
            .addClass('title');

        let users = '';

        project.managers.forEach(
            (manager: string, index: number) =>
                (users +=
                    manager +
                    (index + 1 == project.managers.length
                        ? ''
                        : index + 2 == project.managers.length ? ' et ' : ', '))
        );

        misc
            .child('p')
            .html('Managers : ' + users + '  ')
            .child('a')
            .html('[ + ]')
            .click((event: MouseEvent) => {
                event.preventDefault();

                managers[0](data => {
                    let dialog = this.createModalDialog('Gestion des managers');

                    let input = dialog.child('input');

                    let table = dialog.child('table');

                    input.get(0).oninput = () => {
                        table.html('');

                        data.forEach((e: User) => {
                            let real_name = e.firstname + ' ' + e.name;

                            if (
                                real_name
                                    .toLowerCase()
                                    .indexOf(input.get(0).value.toLowerCase()) <
                                0
                            ) {
                                return;
                            }

                            let row = table.child('tr');

                            row.child('td').html(real_name);

                            if (project.managers_id.indexOf(e.id) >= 0) {
                                let del: ExtJsObject = row
                                    .child('td')
                                    .child('button')
                                    .html('Supprimer')
                                    .addClass('button')
                                    .addClass('danger');

                                del.click(() => {
                                    managers[2](
                                        {
                                            user_id: e.id.toString(),
                                            project_id: project.id.toString()
                                        },
                                        (d: string) => {
                                            if (d) {
                                                alert(d);
                                            } else {
                                                project.managers_id.push(e.id);
                                                let parent = del.parent('td');
                                                parent
                                                    .child('span')
                                                    .html('Supprimé !');
                                                del.remove();
                                            }
                                        }
                                    );
                                });
                            } else {
                                let add: ExtJsObject = row
                                    .child('td')
                                    .child('button')
                                    .html('Ajouter')
                                    .addClass('button');

                                add.click(() => {
                                    managers[1](
                                        {
                                            user_id: e.id.toString(),
                                            project_id: project.id.toString()
                                        },
                                        (d: string) => {
                                            if (d) {
                                                alert(d);
                                            } else {
                                                project.managers_id.push(e.id);
                                                let parent = add.parent('td');
                                                parent
                                                    .child('span')
                                                    .html('Ajouté !');
                                                add.remove();
                                            }
                                        }
                                    );
                                });
                            }
                        });
                    };
                    input.get(0).oninput();
                });
            })
            .css('text-decoration', 'none')
            .get(0).href =
            '#ee';

        if (project.isPublished == true) {
            misc.child('p').html('Ce projet est publié !');

            if (project.video) {
                console.log('e');
            } else if (project.photo) {
                console.log('e1');
            } else if (project.other) {
                console.log('e2');
            }
        } else {
            misc
                .child('p')
                .html("Ce projet n'est pas publié ")
                .child('a')
                .attr('data-internal', true)
                .addClass('button')
                .html('publier')
                .get(0).href =
                'dashboard-publish-project-' + project.id;
        }

        let more: ExtJsObject;

        getHistory(project.id, (data: Array<historyEntry>) => {
            data.forEach((entry, i) => {
                let container: ExtJsObject;

                if (i == 6) {
                    let show_more = misc
                        .child('div')
                        .css('text-align', 'center')
                        .child('button')
                        .html('Afficher plus');

                    more = misc.child('p').css('display', 'none');

                    show_more.click(() => {
                        show_more.remove();

                        more.css('display', 'block');
                    });
                }

                if (i < 6) {
                    container = misc.child('p');
                } else {
                    container = more.child('p');
                }

                this.buildHistory(container, entry);
            });
        });

        let types = [project.type, 'video', 'photo', 'code', '3d', 'jeu'];
        types.forEach((type: string) => {
            let option = document.createElement('option');
            option.value = type;
            option.text = type;
            t.add(option);
        });
        //@ts-ignore
        t.onblur();

        update.click(() => {
            updateProject({
                id: project.id,
                name: name.value(),
                progression: progression.value(),
                description: description.value(),
                shortDescription: short_description.value(),
                type: type.value(),
                goals: goals.value(),
                links: links.value()
            });
        });

        this.page.addUrlSwitcher();
    }
    /**
     * Builds a page that lists all the projects of an user
     * @param projects a list of projects
     */
    public buildMyProjectsPage(projects: Array<Project>) {
        let e = this.container;

        $('.header .title').html('Mes projets');

        let my_projects = e
            .child('div')
            .css('display', 'inline-block')
            .css('vertical-align', 'top')
            .addClass('panel')
            .addClass('padding')
            .css('max-width', '100%')
            .css('width', 'calc(100% - 30px)');

        my_projects
            .child('div')
            .html('Mes projets')
            .addClass('title');

        let table = my_projects
            .child('p')
            .child('table')
            .css('width', '100%')
            .css('max-width', '100%');

        my_projects
            .child('a')
            .addClass('button')
            .html('Créer un projet')
            .attr('data-internal', true)
            .get(0).href =
            'dashboard-new-project';

        let head = table.child('tr');

        head.child('th').html('Nom du projet');

        head.child('th').html('Managers');

        head.child('th').html('Actions');

        projects.forEach(project => {
            let tr = table.child('tr');
            tr.child('td').html(project.name);

            let managers = tr.child('td');

            project.managers.forEach((manager: string) => {
                managers.child('span').html(manager + '<br />');
            });

            let tools = tr.child('td');

            tools
                .child('a')
                .addClass('button')
                .html('Modifier')
                .attr('data-internal', true)
                .get(0).href =
                'dashboard-manage-project-' + project.id;
        });

        this.page.addUrlSwitcher();
    }

    /**
     * buildNewProjectPage
     * @param createProject the function to call in order to create the project
     */
    public buildNewProjectPage(createProject: (project: Project) => void) {
        let e = this.container;

        $('.header .title').html('Créer un projet');

        let project = e
            .child('div')
            .css('display', 'inline-block')
            .css('vertical-align', 'top')
            .addClass('panel')
            .addClass('padding')
            .css('max-width', '100%')
            .css('width', 'calc(100% - 30px)');

        project
            .child('div')
            .html('Créer un projet')
            .addClass('title');

        let name = this.buildInput(project, 'Nom du projet', 'text');

        let description = this.buildInput(
            project,
            'Donnez une courte description de votre projet',
            'textarea'
        );

        let type = this.buildInput(project, 'Type de projet', 'select');

        let t: HTMLSelectElement = type.get(0);

        let types = ['video', 'photo', 'code', '3d', 'jeu'];

        types.forEach((type: string) => {
            let option = document.createElement('option');
            option.value = type;
            option.text = type;
            t.add(option);
        });

        //@ts-ignore
        t.onblur();

        project
            .child('button')
            .click(() => {
                createProject({
                    name: name.value(),
                    shortDescription: description.value(),
                    type: type.value()
                });
            })
            .addClass('button')
            .html('Confirmer et créer')
            .attr('data-internal', true)
            .get(0).href =
            'dashboard-new-project';
    }

    public buildPVPage(data: Array<string>) {
        let e = this.container;

        $('.header .title').html('PV des réunions');

        let panel = e
            .child('div')
            .css('display', 'inline-block')
            .css('vertical-align', 'top')
            .addClass('panel')
            .addClass('padding')
            .css('max-width', '100%')
            .css('width', 'calc(100% - 30px)');

        panel
            .child('div')
            .html('PV des réunions')
            .addClass('title');

        data.forEach(report_url => {
            panel
                .child('p')
                .child('a')
                .html(report_url)
                .get(0).href = report_url;
        });

        this.page.addUrlSwitcher();
    }
}

interface Error {
    type: string;
    message: string;
}
