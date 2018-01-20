import { $, ExtJsObject } from "./extjs";
import { Page, Project, historyEntry } from "./dashboard.model";

export class View {

    public container: ExtJsObject;

    public clear() { this.container.html(''); }

    public page: Page;

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

    public buildHistory(container:ExtJsObject, entry:historyEntry) {
        container.child('i').html(entry.content.date + " - ");

        if (entry.type == "test") {

            container.child('b').html(entry.content.user + " ");

            container.child('span').html(" a créé une entrée dans l'historique du site vicri");

        }
    }

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

    public buildManageProjectPage(project: Project, getHistory:any) {

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

        let project_name = this
            .buildInput(project_infos, "Nom du projet", "text", project.name);

        let progression = this
            .buildInput(project_infos, "Progression du projet (en %)", "number", project.progression.toString());

        let description = this
            .buildInput(project_infos, "Description du projet", "textarea", project.description);

        let short_description = this
            .buildInput(project_infos, "Description résumée du projet", "textarea", project.shortDescription);

        let goals = this
            .buildInput(project_infos, "Objectifs du projet", "textarea", project.goals);

        let links = this
            .buildInput(project_infos, "Liens utiles (séparés par un retour à la ligne)", "textarea", project.links);

        project_infos
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

        misc
            .child('p')
            .html("Ce projet n'est pas publié ")
            .child('button')
            .addClass('button')
            .html('publier');

        getHistory(project.id, (data: Array<historyEntry>) => {

            data.forEach(entry => {

                let container = misc.child('p');

                this.buildHistory(container, entry);

            });

        });
    }

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
}

interface Error {
    type: string,
    message: string
}