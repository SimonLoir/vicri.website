import "./scss/site.style.scss";
import { $, ExtJsObject } from "./extjs";
import { Page } from "./site.model";
import { ConnectionState } from "./shared.model";
export class View {

    private _c: ExtJsObject;
    private _page: Page;

    public clear() { this._c.html("") };

    public manageMenu(state:ConnectionState){
        if(state.isConnected == true){
            $('#menu-login').addClass('hidden');
            $('#menu-db').removeClass('hidden');
            $('#menu-logout').removeClass('hidden');
        }else{
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

    public set container(c: ExtJsObject) { this._c = c; }
    public set page(p: Page) { this._page = p; }
}