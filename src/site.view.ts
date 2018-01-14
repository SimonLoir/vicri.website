import "./scss/site.style.scss";
import { $, ExtJsObject } from "./extjs";
import { Page } from "./site.model";
export class View {

    private _c: ExtJsObject;
    private _page: Page;

    public clear(){this._c.html("")};

    public buildHomePage() {

        let container: ExtJsObject = this._c;

        container.html('<div class="scms-landing-image" style="height:400px;background:url(vicri.jpg) no-repeat;background-position:center;background-size:cover;position:relative;"></div>');

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
            .html("Bienvenue sur notre site ! Ici, vous trouverez les différents projets terminés et en cours du groupe vicri de l'INDSé 2e&3e degrés. Ce site web est un des projets du groupe et son code source est disponible gratuitement sur github :-)");

        this.buildFooter();
    }

    private buildFooter() {

        function ChangeUrl(page: string, url: string) {
            if (typeof (history.pushState) != "undefined") {
                var obj = { Page: page, Url: url };
                history.pushState(obj, obj.Page, obj.Url);
            } else {
                window.location.href = "home";
            }
        }

        function setHash(x_url:string) {
            var split = x_url.split("/");
            x_url = split[split.length - 1];
            
            return"p=" + x_url;
        }

        this._c.child('div').addClass('scms-footer').html("Groupe vicri");

        var all = document.querySelectorAll('[data-internal=true]');

        for (var i = 0; i < all.length; i++) {

            var element: any = all[i];

            element.onclick = (e: MouseEvent) => {

                //@ts-ignore
                this._page.hash = setHash(e.target.href);
                
                //@ts-ignore
                ChangeUrl("Groupe vicri", e.target.href);

                //@ts-ignore
                window.onhashchange();

                return false;
            }
        }
    }

    public set container(c: ExtJsObject) { this._c = c; }
    public set page(p: Page) { this._page = p; }
}