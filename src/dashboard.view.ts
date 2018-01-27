import { $, ExtJsObject } from "./extjs";
import { Page, Project, historyEntry, User } from "./dashboard.model";

export class View {

    public container: ExtJsObject;

    public page: Page;

    /**
     * Sets the menu to it's default state
     */
    public restoreMenu(){
        if(document.querySelector('.hamburger').classList.contains('clicked')){
            $('.hamburger').click();
        }
    }

    /**
     * Function called to clear the view
     */
    public clear() { this.container.html(''); }
    /**
     * Builds the home page
     * @param getHistory Gets the history of teh website
     */
    public buildHomePage(getHistory: (id: string, callback: (data: Array<historyEntry>) => void) => void) {

        let e = this.container;

        $(".header .title").html("Home page");

        let welcome = e
            .child('div')
            .css('display', "inline-block")
            .css('vertical-align', "top")
            .addClass('panel')
            .addClass('padding')
            .addClass('col2')
            .addClass('left');

        welcome
            .child('div')
            .html('Bienvenue sur le dashboard vicri !')
            .addClass("title");

        welcome
            .child('p')
            .html('Bienvenue sur votre tableau de bord ;-). Ici, vous retrouverez toutes les fonctions présentes sur la version précédente du site et plus encore :-).');

        welcome
            .child('a')
            .addClass('button')
            .html('Découvrir les projets')
            .attr("data-internal", true).get(0).href = "dashboard-discover-projects";

        welcome
            .child('a')
            .addClass('button')
            .html('Créer un projet')
            .attr("data-internal", true).get(0).href = "dashboard-new-project";

        welcome
            .child('a')
            .addClass('button')
            .html('PV des réunions')
            .attr("data-internal", true).get(0).href = "dashboard-pv";

        let news = e
            .child('div')
            .css('display', "inline-block")
            .css('vertical-align', "top")
            .addClass('panel')
            .addClass('padding')
            .addClass('col2')
            .addClass('right');

        news
            .child('div')
            .html('Quoi de neuf ?')
            .addClass("title");

        getHistory("-1", (data: Array<historyEntry>) => {

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
        container.child('i').html(entry.content.date + " - ");

        if (entry.type == "test") {

            container.child('b').html(entry.content.user + " ");

            container.child('span').html(" a créé une entrée dans l'historique du site vicri");

        } else if (entry.type == 'project_update') {

            container.child('b').html(entry.content.user + " ");

            container.child('span').html(" a mis à jour le(s) champ(s) " + entry.content.props.toString() + " de ce projet");

        } else if (entry.type == "project_created") {

            container.child('b').html(entry.content.user + " ");

            container.child('span').html(" a créé le projet " + entry.content.name);


        }
    }
    /**
     * Builds an error page from an error object
     * @param error.message the message of the error 
     */
    public buildErrorPage(error: Error) {

        $(".header .title").html("Erreur");

        let error_page = this
            .container
            .addClass('panel')
            .addClass('padding')
            .child('div')
            .addClass('error_container')

        let error_zone = error_page
            .child('div')
            .addClass('error_zone');

        let error_svg = error_zone
            .child('img')
            .get(0).src = "res/error.svg";

        error_zone
            .child('h1')
            .html('Une erreur est survenue');

        error_zone
            .child('p')
            .html(error.message);
    }
    /**
     * Creates an input (material design)
     * @param parent the parent container
     * @param label_text the placeholder
     * @param type the type of the input
     * @param default_value the default value
     */
    public buildInput(parent: ExtJsObject, label_text: string, type: string, default_value?: string): ExtJsObject {

        let input_types = ["text", "password", "number", "range"];
        let other_types = ["textarea", "select"];

        let div = parent
            .child('div')
            .addClass("field");

        let label = div
            .child('label')
            .addClass('top')
            .html(label_text);

        let input: ExtJsObject;

        if (input_types.indexOf(type) >= 0) {
            input = div
                .child('input')
                .addClass('input');
            input
                .get(0)
                .type = type;
        } else {
            input = div
                .child(type)
                .addClass('input')
                .addClass(type);
        }

        let i = input.get(0);

        i.onfocus = function () {
            this.parentElement.classList.add('focus');
            if (this.parentElement.classList.contains("notempty")) {
                this.parentElement.classList.remove('notempty');
            }
        }

        i.onblur = function () {
            this.parentElement.classList.remove('focus');
            if (this.value != "") {
                this.parentElement.classList.add('notempty');
            }
        }

        if (default_value)
            input.value(default_value);

        i.onfocus();
        i.onblur();

        return input;
    }
    public createModalDialog(title: string) {

        let mask = $("body")
            .child('div')
            .addClass('mask');

        let modal = mask
            .child('div')
            .addClass('modal');

        let t = modal
            .child('span')
            .html(title)
            .addClass("title");

        let cross = modal
            .child('span')
            .addClass('cross')
            .html('×');


        mask.click((e) => {
            if (e.target == mask.get(0) || e.target == null) {
                mask.addClass('hidden');
                setTimeout(() => {
                    mask.remove();
                }, 1000);
            }
        })

        cross.click(() => {
            mask.click();
        });

        return modal;

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
        managers: [(func: (data: Array<User>) => void) => void]) {

        let e = this.container;

        $(".header .title").html("Gestion du projet");

        let project_infos = e
            .child('div')
            .css('display', "inline-block")
            .css('vertical-align', "top")
            .addClass('panel')
            .addClass('padding')
            .addClass('col2')
            .addClass('left');

        project_infos
            .child('div')
            .html('Gestion du projet')
            .addClass("title");

        let name = this
            .buildInput(project_infos, "Nom du projet", "text", project.name);

        let progression = this
            .buildInput(project_infos, "Progression du projet (en %)", "number", project.progression.toString());

        let p: HTMLInputElement = progression.get(0);
        p.max = "100";
        p.min = "0";

        let type = this
            .buildInput(project_infos, "Type de projet", "select");

        let t: HTMLSelectElement = type.get(0);

        let description = this
            .buildInput(project_infos, "Description du projet", "textarea", project.description);

        let short_description = this
            .buildInput(project_infos, "Description résumée du projet", "textarea", project.shortDescription);

        let goals = this
            .buildInput(project_infos, "Objectifs du projet", "textarea", project.goals);

        let links = this
            .buildInput(project_infos, "Liens utiles (séparés par un retour à la ligne)", "textarea", project.links);

        let update = project_infos
            .child('button')
            .addClass('button')
            .html('Modifier');

        let misc = e
            .child('div')
            .css('display', "inline-block")
            .css('vertical-align', "top")
            .addClass('panel')
            .addClass('padding')
            .addClass('col2')
            .addClass('right');

        misc
            .child('div')
            .html('Divers')
            .addClass("title");

        let users = "";

        project.managers.forEach(
            (manager: string, index: number) => users += manager + ((index + 1 == project.managers.length) ? "" : ((index + 2 == project.managers.length) ? " et " : ", "))
        );

        misc
            .child('p')
            .html('Managers : ' + users + "  ")
            .child("a")
            .html('[ + ]')
            .click((event: MouseEvent) => {

                event.preventDefault();

                managers[0]((data) => {

                    let dialog = this.createModalDialog("Gestion des managers");

                    let table = dialog.child('table');

                    data.forEach((e: User) => {

                        let row = table.child("tr");

                        row.child('td').html(e.firstname + " " + e.name);

                        if (project.managers_id.indexOf(e.id) >= 0) {
                            let del: ExtJsObject = row.child('td').child('button').html('Supprimer').addClass('button').addClass('danger');

                            del
                                .click(() => {

                                });

                        } else {
                            let add: ExtJsObject = row.child('td').child('button').html('Ajouter').addClass('button');
                        }

                    });

                });

            })
            .css('text-decoration', "none")
            .get(0).href = "#ee";

        if (project.isPublished == true) {
            misc
                .child('p')
                .html("Ce projet est publié !");

            if (project.video) {
                console.log("e")
            } else if (project.photo) {
                console.log("e1")
            } else if (project.other) {
                console.log("e2")
            }
        } else {
            misc
                .child('p')
                .html("Ce projet n'est pas publié ")
                .child('button')
                .addClass('button')
                .html('publier');
        }

        getHistory(project.id, (data: Array<historyEntry>) => {

            data.forEach(entry => {

                let container = misc.child('p');

                this.buildHistory(container, entry);

            });

        });

        let types = [project.type, "video", "photo", "code", "3d", "jeu"];
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
    }
    /**
     * Builds a page that lists all the projects of an user
     * @param projects a list of projects
     */
    public buildMyProjectsPage(projects: Array<Project>) {

        let e = this.container;

        $(".header .title").html("Mes projets");

        let my_projects = e
            .child('div')
            .css('display', "inline-block")
            .css('vertical-align', "top")
            .addClass('panel')
            .addClass('padding')
            .css('max-width', "100%")
            .css('width', "calc(100% - 30px)");

        my_projects
            .child('div')
            .html('Mes projets')
            .addClass("title");

        let table = my_projects
            .child('p')
            .child('table')
            .css("width", "100%")
            .css("max-width", "100%");

        my_projects
            .child('a')
            .addClass('button')
            .html('Créer un projet')
            .attr("data-internal", true).get(0).href = "dashboard-new-project";

        let head = table
            .child('tr');

        head
            .child("th")
            .html('Nom du projet');

        head
            .child("th")
            .html('Managers');

        head
            .child('th')
            .html('Actions')

        projects.forEach((project) => {

            let tr = table.child('tr');
            tr.child('td').html(project.name);

            let managers = tr
                .child('td');

            project.managers.forEach((manager: string) => {
                managers
                    .child('span')
                    .html(manager + '<br />');
            });

            let tools = tr.child('td')

            tools
                .child('a')
                .addClass('button')
                .html('Modifier')
                .attr("data-internal", true).get(0).href = "dashboard-manage-project-" + project.id;
        });

        this.page.addUrlSwitcher();
    }

    /**
     * buildNewProjectPage
     * @param createProject the function to call in order to create the project
     */
    public buildNewProjectPage(createProject: (project: Project) => void) {
        let e = this.container;

        $(".header .title").html("Créer un projet");

        let project = e
            .child('div')
            .css('display', "inline-block")
            .css('vertical-align', "top")
            .addClass('panel')
            .addClass('padding')
            .css('max-width', "100%")
            .css('width', "calc(100% - 30px)");

        project
            .child('div')
            .html('Créer un projet')
            .addClass("title");

        let name = this
            .buildInput(project, "Nom du projet", "text");

        let description = this
            .buildInput(project, "Donnez une courte description de votre projet", "textarea");

        let type = this
            .buildInput(project, "Type de projet", "select");

        let t: HTMLSelectElement = type.get(0);

        let types = ["video", "photo", "code", "3d", "jeu"];

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
            .attr("data-internal", true).get(0).href = "dashboard-new-project";
    }

    public buildPVPage(data: Array<string>) {

        let e = this.container;

        $(".header .title").html("PV des réunions");

        let panel = e
            .child('div')
            .css('display', "inline-block")
            .css('vertical-align', "top")
            .addClass('panel')
            .addClass('padding')
            .css('max-width', "100%")
            .css('width', "calc(100% - 30px)");

        panel
            .child('div')
            .html('PV des réunions')
            .addClass("title");

        data.forEach((report_url) => {

            panel
                .child('p')
                .child('a')
                .html(report_url)
                .get(0)
                .href = report_url
        });


        this.page.addUrlSwitcher();

    }
}

interface Error {
    type: string,
    message: string
}