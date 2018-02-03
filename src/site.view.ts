import "./scss/site.style.scss";
import { $, ExtJsObject } from "./extjs";
import { Page, Project } from "./site.model";
import { ConnectionState } from "./shared.model";
export class View {

    private _c: ExtJsObject;
    private _page: Page;

    public clear() { this._c.html("") };

    public manageMenu(state: ConnectionState) {
        if (state.isConnected == true) {
            $('#menu-login').addClass('hidden');
            $('#menu-db').removeClass('hidden');
            $('#menu-logout').removeClass('hidden');
        } else {
            $('#menu-login').removeClass('hidden');
            $('#menu-db').addClass('hidden');
            $('#menu-logout').addClass('hidden');
        }
    }

    public buildHomePage() {

        let container: ExtJsObject = this._c;

        container.html('<div class="scms-landing-image" style="height:600px;background:url(vicri.jpg) no-repeat;background-position:center;background-size:cover;position:relative;"></div>');

        let welcome_block: ExtJsObject = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element');

        welcome_block
            .child('h2')
            .html("Bienvenue sur le site web du groupe vicri de l'INDSé")
            .addClass('scms-content-block-title');

        welcome_block
            .child('p')
            .addClass('scms-content-block-paragraph')
            .html(
            "Bienvenue sur notre site ! Ici, vous trouverez les différents projets terminés et en cours du groupe vicri de l'INDSé 2e&3e degrés. Ce site web est un des projets du groupe et son code source est disponible gratuitement sur github :-)"
            + " Les projets terminés sont rangés dans les différentes catégories : Vidéos, Photos et Autres. Les projets en cours se trouvent dans la partie Projets."
            );

        container
            .child('div')
            .addClass('scms-landing-image')
            .css('height', "250px")
            .css('background', "url(res/photos.jpg) no-repeat")
            .css('background-size', "cover")
            .css('background-position', "center");

        let photos_block: ExtJsObject = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element');

        photos_block
            .child('h2')
            .html("Nos photos")
            .addClass('scms-content-block-title');

        photos_block
            .child('p')
            .addClass('scms-content-block-paragraph')
            .html("Vous retrouverez, ici, organisées par dossier triés par date, toutes les photos réalisées par le groupe vicri de l'INDSé 2e&3e degrés.");

        photos_block
            .child('a')
            .addClass('scms-simple-action-button')
            .html('Voir les photos')
            .attr('data-internal', true)
            .get(0).href = "photos";

        container
            .child('div')
            .addClass('scms-landing-image')
            .css('height', "250px")
            .css('background', "url(res/videos.jpg) no-repeat")
            .css('background-size', "cover")
            .css('background-position', "center");

        let videos_block: ExtJsObject = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element');

        videos_block
            .child('h2')
            .html("Nos vidéos")
            .addClass('scms-content-block-title');

        videos_block
            .child('p')
            .addClass('scms-content-block-paragraph')
            .html("Vous retrouverez, ici, toutes les vidéos réalisées par le groupe vicri de l'INDSé 2e&3e degrés qui ont été uploadées sur YouTube");

        videos_block
            .child('a')
            .addClass('scms-simple-action-button')
            .html('Voir les vidéos')
            .attr('data-internal', true)
            .get(0).href = "photos";


        this.buildFooter();
    }

    public build404Page() {
        let content = this._c;
        content.html('<div class="scms-basics-404-image" style="background:url(\'./res/404-rail.jpg\') no-repeat;background-position:center;background-size:cover;"><link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet"><span class="inside-scms-basics-404-span">404</span><span class="inside-scms-basics-404-span-2">You\'re lost !</span><a href="home" class="go-home-button"><button class="scms-simple-action-button" >HOME PAGE</button></a><span class="powered-by-scms">Powered by SCMS</span></div>')
        this.buildFooter();
    }

    private buildFooter() {

        this._c.child('div').addClass('scms-footer').html("Groupe vicri");

        this.buildLinks();

    }

    private buildLinks() {
        var all = document.querySelectorAll('[data-internal=true]');

        for (var i = 0; i < all.length; i++) {

            var element: any = all[i];

            element.onclick = (e: MouseEvent) => {

                //@ts-ignore
                this._page.hash = this._page.setHash(e.target.href);

                //@ts-ignore
                this._page.changeUrl("Groupe vicri", e.target.href);

                //@ts-ignore
                window.onhashchange();

                return false;
            }
        }
    }


    public buildProjectsPage(getProjects: (callback: (projects?: Array<Project>) => void) => void) {

        let container: ExtJsObject = this._c;

        container.html('<div class="scms-landing-image" style="height:600px;max-height:calc(100vh - 60px);background:url(./res/projects.jpg) no-repeat;background-position:center;background-size:cover;position:relative;"></div>');

        let project_block: ExtJsObject = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element')
            .css('background', "#fcfcfc");

        project_block
            .child('h2')
            .html("Bienvenue sur notre page projets ! ")
            .addClass('scms-content-block-title');

        project_block
            .child('p')
            .addClass('scms-content-block-paragraph')
            .css('text-align', "center")
            .html(
            "Ici, vous trouverez les différents projets réalisés par notre groupe qu'ils soient terminés ou non."
            );

        let wrapper = project_block
            .child('div')
            .addClass('wrapper');

        getProjects((projects) => {
            projects.forEach((project) => {

                function nl2br(str: string, is_xhtml: boolean) {
                    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
                    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
                }

                let pb = wrapper
                    .child('div')
                    .addClass('project')

                let pbc: ExtJsObject = pb
                    .child('div')
                    .addClass('img')

                pbc
                    .child('div')
                    .css('background', "url(https://picsum.photos/450/300?random#" + Math.random() + ") no-repeat")
                    .css('background-position', "center")
                    .css('background-size', "cover")
                    .addClass('rimg')

                pbc
                    .child('div')
                    .addClass('text')
                    .html(project.name);

                pb
                    .child('p')
                    .html(nl2br(project.shortDescription, false));

                let cf = pb
                    .child('div')
                    .addClass('clearfix')

                let cf_h = pb.child("div")
                cf_h
                    .addClass('cf-hover')
                    .child('a')
                    .addClass("button")
                    .html('Voir le projet')
                    .css('text-decoration', "none")
                    .attr('data-internal', true)
                    .get(0)
                    .href = "project-" + project.id

                this.buildLinks();
            });
        });

        this.buildFooter();
    }

    public buildVideosPage(getProjects: (callback: (projects?: Array<any>) => void) => void) {

        let container: ExtJsObject = this._c;

        container.html('<div class="scms-landing-image" style="height:600px;max-height:calc(100vh - 60px);background:url(./res/our_videos.jpg) no-repeat;background-position:center;background-size:cover;position:relative;"></div>');

        let project_block: ExtJsObject = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element')
            .css('background', "#fcfcfc");

        project_block
            .child('h2')
            .html("Bienvenue sur notre page videos ! ")
            .addClass('scms-content-block-title');

        project_block
            .child('p')
            .addClass('scms-content-block-paragraph')
            .css('text-align', "center")
            .html(
            "Ici, vous trouverez les vidéos réalisées par les membres du groupe vicri"
            );

        let wrapper = project_block
            .child('div')
            .addClass('wrapper');

        getProjects((projects) => {
            projects.forEach((project) => {

                function nl2br(str: string, is_xhtml: boolean) {
                    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
                    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
                }

                let pb = wrapper
                    .child('div')
                    .addClass('project')

                let pbc: ExtJsObject = pb
                    .child('div')
                    .addClass('img')

                pbc
                    .child('div')
                    .css('background-position', "center")
                    .css('background-size', "cover")
                    .addClass('rimg')
                    .css('opacity', "1")
                    .html(`
                        <iframe style="width:100%;height:100%" src="https://www.youtube.com/embed/${project.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    `);


                pb
                    .child('p')
                    .html(`<b>${project.title}</b><br /><div style="height:5px;"></div>${nl2br(project.description, false)}`);

                let cf = pb
                    .child('div')
                    .addClass('clearfix')

                let cf_h = pb.child("div")
                cf_h
                    .addClass('cf-hover')
                    .child('a')
                    .addClass("button")
                    .html('Voir le projet')
                    .css('text-decoration', "none")
                    .attr('data-internal', true)
                    .get(0)
                    .href = "project-" + project.id

                this.buildLinks();
            });
        });

        this.buildFooter();
    }

    public buildProjectPage(getProject: (id: string, callback: (data: Project) => void, error: (error: Project) => void) => void, id: string) {

        let container: ExtJsObject = this._c;

        let project_block: ExtJsObject = container
            .child('div')
            .addClass('scms-content-block')
            .child('div')
            .addClass('scms-centred-element')
            .css('background', "#fcfcfc");

        getProject(id, project => {

            let managers = "";

            project.managers.forEach(
                (manager: string, index: number) => managers += manager + ((index + 1 == project.managers.length) ? "" : ((index + 2 == project.managers.length) ? " et " : ", "))
            );

            project_block
                .child('h2')
                .html(project.name)
                .addClass('scms-content-block-title');

            project_block
                .child('p')
                .addClass('scms-content-block-paragraph')
                .html(`Type de projet : ${project.type}`);

            project_block
                .child('p')
                .addClass('scms-content-block-paragraph')
                .html(`Manager(s) : ${managers}`);

            project_block
                .child('p')
                .addClass('scms-content-block-paragraph')
                .html(`Résumé : ${project.shortDescription}`);

            project_block
                .child('p')
                .addClass('scms-content-block-paragraph')
                .html(`Description : ${project.description}`);
            
            if (project.isPublished == true) {
                project_block
                    .child('p')
                    .addClass('scms-content-block-paragraph')
                    .html(`Ce projet est publié`);
            }                

        }, (error) => {

            project_block
                .html(`Une erreur est survenue : il se peut que le projet n'existe pas<br /> ${error.message}`);

        });

        this.buildFooter();

    }

    public set container(c: ExtJsObject) { this._c = c; }
    public set page(p: Page) { this._page = p; }
}