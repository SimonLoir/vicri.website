import { $, ExtJsObject } from "./extjs";
import { Page } from "./dashboard.model";

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
            .child('button')
            .html('Découvrir les projets');

        welcome
            .child('button')
            .html('Créer un projet');

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
            .html('<b>Simon Loir</b> a publié <a href="">le PV</a> de la réunion du 18/01/2019')
        
        news
            .child('p')
            .html('<b>François Schoubben</b> a créé l\'évènement réunion du 18/01/2019 avec la note <i>Venez avec vos projets finis !</i>')  
    }
}