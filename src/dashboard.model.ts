import { P, SharedModel } from "./shared.model";
import { AR } from "./extjs";

export class Page extends P {};
export class Model extends SharedModel {

    /**
     * Gets a list of all the usres of the site
     * @param callback function walled when the list of all the users as been downloaded
     */
    public getAllUsers(callback: (data: Array<User>) => void) {
        AR.GET(this.api_url + "api?res=users", (data) => {
            try {

                let d: Array<User> = JSON.parse(data);

                callback(d);

            } catch (error) {
                console.log(error)
            }
        }, () => {
            console.log('Fatal error 500');
        });
    }

    /**
     * Gets the user's projects
     * @param callback function to call when everythong has been loaded
     */
    public getUsersProject(callback: (data: Array<Project>) => void) {
        AR.GET(this.api_url + "api?res=user-projects", (data) => {
            try {

                let d: Array<Project> = JSON.parse(data);

                callback(d);

            } catch (error) {
                console.log(error)
            }
        });
    }
    /**
     * Gets the informations of a project via it's id
     * @param id the id of the project
     * @param callback function to call when * is ok
     * @param onErrorCallback function to call if something went wrong
     * @param othercallback function passed to callback
     * @param second_other_callback function passed to callback
     */
    public getProjectById(id:string, callback: (data: Project, other?:any, second_other?:any, third_other_callback?:any)  => void, onErrorCallback:(data: Project) => void, othercallback?:any, second_other_callback?:any, third_other_callback?:any){
        AR.GET(this.api_url + "api?res=project&manager&id=" + id, (data) => {
            try {

                let d: Project = JSON.parse(data);

                if(d.type != "error" && d.message == undefined){
                    if(othercallback != undefined && second_other_callback != undefined && third_other_callback != undefined){
                        callback(d, othercallback, second_other_callback, third_other_callback);                        
                    }else{
                        callback(d);
                    }
                }else{
                    if(onErrorCallback != undefined){
                        onErrorCallback(d);
                    }
                }


            } catch (error) {
                console.log(error)
            }
        });
    }
    /**
     * Updates the project with the new valmues of the project object
     * @param project the object that contains all the new values 
     */
    public updateProject(project:Project){

        let keys = Object.keys(project);

        keys.forEach((key:string, index:number) => {

            //@ts-ignore
            let value:string = project[key];

            if(value.trim() == ""){
                alert(`Paramètre ${keys} ne peut pas être vide !`);
                return false;
            }

        });

        if(["video", "photo", "code", "3d", "jeu"].indexOf(project.type) < 0){
            alert(`Le type ${project.type} n'existe pas`);
            return false;
        }
        
        let ask = confirm('Cette modification est irréversible, continuer ?');
        
        if(ask == true){

            AR.PUT(this.api_url + "api/index.php?res=project", project, (data) => {

                if(data != "ok"){
                    alert('Le serveur a rencontré une erreur inconnue : ' + data);
                }else{
                    alert('Projet mis à jour');
                    window.location.reload();
                }

            });

        }

    }
    /**
     * Gets the history of the project
     * @param id id of the project (-1 if global)
     * @param callback function to call when * has been loaded
     */
    public getHistory(id:string, callback:(data:Array<historyEntry>) => void){
        AR.GET(this.api_url + "api?res=history&id=" + id, (data) => {
            try {

                let d:Array<historyEntry> = JSON.parse(data);
                
                callback(d);

            } catch (error) {
                console.log(error)
            }
        });
    }
    /**
     * Creates a project with the project given
     * @param project project object used to create the project
     */
    public createProject(project:Project){

        if(["video", "photo", "code", "3d", "jeu"].indexOf(project.type) < 0){
            alert(`Le type ${project.type} n'existe pas`);
            return false;
        }

        if(project.name.trim().length < 10){
            alert('Donnez un nom plus grand');
            return;
        }

        if(project.shortDescription.length > 250){
            alert('Cette description est trop grande');
            return false;
        }

        if(project.shortDescription.length < 50){
            alert('Cette description est trop petite (entre 80 et 250 caractères)');
            return false;
        }

        AR.POST(this.api_url + "api/index.php?res=project", project, (data) => {

            if(data.indexOf("ok") != 0){
                alert('Le serveur a rencontré une erreur inconnue : ' + data);
            }else{
                alert('Projet créé');
                window.location.href = "dashboard-my-projects";
            }

        }, () => {
            alert("Erreur 500 : internal server error");
        });
    }

    /**
     * Gets all the reports of the last meetings
     * @param callback Function that is called when all the reports have been loaded
     */
    getAllMeetingReports(callback : (data:Array<string>) => void){
        AR.GET(this.api_url + "api?res=pv", (data) => {
            try {

                let d: Array<string> = JSON.parse(data);

                callback(d);

            } catch (error) {
                console.log(error)
            }
        });
    }
};

interface historyEntryContent{
    date: string
    user?: string
    resource_url?: string
    props?: Array<string>
    name?:string
}

export interface historyEntry{
    type: string
    content:historyEntryContent
    project_id: Number
    id:Number
    message?: string
}

export interface PublishedVideoProject{
    id: Number
    url: string
    provider: string
    title: string
    description: string
}

export interface PublishedPhotoProject{
    id: Number
    title: string
    cover: string
    description: string
}

export interface PublishedOtherProject{
    id: Number
    link: string
    name: string
    image: string
    description: string
}

export interface Project{
    name: string
    type: any
    shortDescription: string
    goals?: string
    links?: string,
    id?: number
    progression?: number
    description?: string
    managers?: any
    pined?: number
    message?: string
    video?:PublishedVideoProject
    other?:PublishedPhotoProject
    photo?:PublishedOtherProject
    isPublished?:boolean,
    managers_id?: Array<Number>
}

export interface User{
    firstname: string,
    mail:string,
    name:string,
    pseudo:string,
    id:Number 
}