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

    public getProjectById(id:string, callback: (data: Project)  => void){
        AR.GET(this.api_url + "api?res=project&id=" + id, (data) => {
            try {

                let d: Project = JSON.parse(data);

                callback(d);

            } catch (error) {
                console.log(error)
            }
        });
    }
};

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
    links: string
}