import "./scss/dashboard.scss";
import { View } from "./dashboard.view";
import { $ } from "./extjs";
import { Page, Model } from "./dashboard.model";
import { ConnectionState } from "./shared.model";

/**
 * The controller is the link between the view and the model
 */
class Controller {
    
    private _page:Page;
    private _model:Model;
    private _view:View;

    /**
     * Creates a new controller
     * @param page the page object
     * @param model the model used by the controller
     * @param view the view used by te controller
     */
    constructor (page:Page, model:Model, view:View) {
        this._page = page;
        this._model = model;
        this._view = view;
    }

    /**
     * Loads the page from this._page.name
     */
    public loadPage() {
        this._model.login(undefined, this.choosePage.bind(this), this.choosePage.bind(this));
        this._view.restoreMenu();
    }

    /**
     * Choose the right page
     * @param state the connection state of the user
     */
    private choosePage(state:ConnectionState){
        this._view.clear();
        switch (this._page.name) {
            case "home":
                this._view.buildHomePage(this._model.getHistory.bind(this._model));
                break;
            
            case "my-projects":
                this._model.getUsersProject(this._view.buildMyProjectsPage.bind(this._view));
                break;

            case "manage-project":
                let project_id = this._page.get('id');
                this._model.getProjectById(
                    project_id, 
                    this._view.buildManageProjectPage.bind(this._view), 
                    this._view.buildErrorPage.bind(this._view), 
                    this._model.getHistory.bind(this._model),
                    this._model.updateProject.bind(this._model),
                    [this._model.getAllUsers.bind(this._model)]
                );
                break;
            case "new-project":
                this._view.buildNewProjectPage(this._model.createProject.bind(this._model));
                break;

            case "pv":
                
                this._model.getAllMeetingReports(this._view.buildPVPage.bind(this._view));

                break;

            default:
                this._view.buildErrorPage({
                    type: "error",
                    message:"Erreur 404 : cette page est introuvable"
                });
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
    view.container = $('.body');
    
    // Getting the model ready by defining the api directory
    model.api_url = "";

    // Url system
    page.isDb = true;

    // Creating a new controller object
    let controller = new Controller(page, model, view);
    
    //@ts-ignore Getting the page ready
    controller.page.hash = window_hash; // This variable is defined via PHP


    // Loading the page
    controller.loadPage();

    // Setting page
    view.page = controller.page;

    // When the url changes without reloading the page
    window.onpopstate = function(event) {
        controller.page.hash = controller.page.setHash(document.location.href);
        //@ts-ignore
        window.onhashchange();
    };

    // When the part after the #changes
    window.onhashchange = function (){
        controller.loadPage();
    };

    // Hamburger menu system
    let menu = $('.left_panel');
    $('.hamburger').click(function() {
        if (this.classList.contains('clicked')) {
            $(this).removeClass('clicked');
            $(this).addClass('none');
            menu.removeClass('open');
        } else {
            $(this).removeClass('none');
            $(this).addClass('clicked');
            menu.addClass('open');
        };
    });

});