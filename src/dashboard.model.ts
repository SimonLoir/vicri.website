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

    public getProjectById(id:string, callback: (data: Project, other?:any)  => void, onErrorCallback:(data: Project) => void, othercallback?:any){
        AR.GET(this.api_url + "api?res=project&manager&id=" + id, (data) => {
            try {

                let d: Project = JSON.parse(data);

                if(d.type != "error" && d.message == undefined){
                    if(othercallback != undefined){
                        callback(d, othercallback);                        
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
}

export interface historyEntry{
    type: string
    content:historyEntryContent
    project_id: Number
    id:Number
    message?: string
}

export interface Project {
    id: number
    name: string
    managers: any
    type: any
    progression: number
    pined: number
    description: string
    shortDescription: string
    goals: string
    links: string,
    message?: string
}