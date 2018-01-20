import { $, ExtJsObject } from "./extjs";
import { Page, Project } from "./dashboard.model";

export class View {

    public container: ExtJsObject;

    public clear() { this.container.html(''); }

    public page: Page;

    public buildHomePage() {

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
        
        news
            .child('p')
            .html('<b>Simon Loir</b> a publié <a href="">le PV</a> de la réunion du 18/01/2019');
        
        news
            .child('p')
            .html('<b>François Schoubben</b> a créé l\'évènement réunion du 18/01/2019 avec la note <i>Venez avec vos projets finis !</i>')  
        
        news
            .child('p')
            .html('<b>Simon Loir</b> a publié une mise à jour dans <i>vicri.esy.es</i>');
        
        this.page.addUrlSwitcher();
    }

    public buildErrorPage(error: Project){
        
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

    public buildMyProjectsPage(projects:Array<Project>){
        console.log(projects)

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

            project.managers.forEach((manager:string) => {
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