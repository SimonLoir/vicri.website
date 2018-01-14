/**
 * Modules are imported here
 */
import {View} from './site.view';
import {Page, Model} from './site.model';
import {$, AR} from './extjs';

/**
 * The controller is the link between the view and the model
 */
class Controller {
    
    private _page:Page;
    private _model:Model;
    private _view:View;

    constructor (page:Page, model:Model, view:View) {
        this._page = page;
        this._model = model;
        this._view = view;
    }

    /**
     * Loads the page from this._page.name
     */
    public loadPage() {
        console.log(this)
        console.log(this._page)
        switch (this._page.name) {
            case "home":
                this._view.buildHomePage();
                break;
            default:
                this._view.clear();
                break;
        }
    }

    /**
     * @returns {Page} returns an instance of Page
     */
    public get page():Page{
        return this._page;
    }

}

/**
 * When the document is ready;
 */
$(document).ready(() => {
    
    // Getting objects ready
    let page = new Page();
    let model = new Model();
    let view = new View();
    
    // Getting workspace ready
    view.container = $('.dynamic-content');

    // Creating a new controller object
    let controller = new Controller(page, model, view);
    
    //@ts-ignore Getting the page ready
    controller.page.hash = window_hash; // This variable is defined via PHP

    // Loading the page
    controller.loadPage();

    // Setting page
    view.page = controller.page;

    window.onhashchange = function (){
        controller.loadPage();
    };

});