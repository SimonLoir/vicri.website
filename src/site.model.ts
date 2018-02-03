import { SharedModel, P } from "./shared.model";
import { AR } from "./extjs";

export class Model extends SharedModel {

    /**
     * Gets a list of all the videos that are on the site
     * @param callback function that is called once all the videos have been gotten
     */
    getVideos(callback: (d: any[]) => void) {
        console.log(this)
        AR.GET(this.api_url + 'api/index.php?res=videos', (data) => {

            let d: Array<any> = JSON.parse(data);

            callback(d)
        }, () => {
            alert('Une erreur est survenue');
        });
    }

    /**
     * Gets a list of all the projects that are on the site
     * @param callback function that is called once all the project have been gotten
     */
    getProjects(callback: (d: Project[]) => void) {
        console.log(this)
        AR.GET(this.api_url + 'api/index.php?res=projects', (data) => {

            let d: Array<Project> = JSON.parse(data);

            callback(d)
        }, () => {
            alert('Une erreur est survenue');
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
    public getProjectById(id: string, callback: (data: Project) => void, onErrorCallback: (data: Project) => void) {
        AR.GET(this.api_url + "api?res=project&id=" + id, (data) => {
            try {

                let d: Project = JSON.parse(data);

                if (d.type != "error" && d.message == undefined) {
                    callback(d);
                } else {
                    if (onErrorCallback != undefined) {
                        onErrorCallback(d);
                    }
                }


            } catch (error) {
                onErrorCallback({
                    type: "error",
                    message: error.toString()
                });
            }
        });
    }

}
export class Page extends P { }


export interface Project {
    type: any
    name?: string
    progression?: number
    description?: string
    shortDescription?: string
    goals?: string
    links?: string,
    id?: number
    managers?: any
    pined?: number
    message?: string
    isPublished?: boolean
}