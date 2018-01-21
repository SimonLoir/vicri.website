import { P, SharedModel } from "./shared.model";
import { AR } from "./extjs";

export class Page extends P {};
export class Model extends SharedModel {
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

    public getProjectById(id:string, callback: (data: Project, other?:any, second_other?:any)  => void, onErrorCallback:(data: Project) => void, othercallback?:any, second_other_callback?:any){
        AR.GET(this.api_url + "api?res=project&manager&id=" + id, (data) => {
            try {

                let d: Project = JSON.parse(data);

                if(d.type != "error" && d.message == undefined){
                    if(othercallback != undefined && second_other_callback != undefined){
                        callback(d, othercallback, second_other_callback);                        
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
};

interface historyEntryContent{
    date: string
    user?: string
    resource_url?: string
    props?: Array<string>
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
    progression: number
    description: string
    shortDescription: string
    goals: string
    links: string,
    id?: number
    managers?: any
    pined?: number
    message?: string
    video?:PublishedVideoProject
    other?:PublishedPhotoProject
    photo?:PublishedOtherProject
    isPublished?:boolean
}