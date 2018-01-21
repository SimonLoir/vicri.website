import {SharedModel, P} from "./shared.model";
import { AR } from "./extjs";

export class Model extends SharedModel{

    getProjects(callback:(d:Project[]) => void){
        console.log(this)
        AR.GET(this.api_url + 'api/index.php?res=projects', (data) => {

            let d:Array<Project> = JSON.parse(data);

            callback(d)
        }, () => {
            alert('Une erreur est survenue');
        });
    }

}
export class Page extends P{}


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
    isPublished?:boolean
}