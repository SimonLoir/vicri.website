import {SharedModel} from "./shared.model";
export class Page{

    private _hash:string;

    /**
     * Gets the value associated with a key (needle) in a query string
     * @param needle The key to which the value is associated
     */
    public get(needle:string):string{
        let url = this._hash;

        let informations = url.split(";");

        for (let i = 0; i < informations.length; i++) {

            const info = informations[i];

            const i_split = info.split('=');

            if (i_split[0] == needle) {
                return i_split[1];
            }

        }

        return "";
    }

    /**
     * Gets the name of the current page
     */
    public get name() {
        var p = "";
        if (this.get('page') != "") {
            p = this.get('page');
        } else if (this.get('p') != "") {
            p = this.get('p');
        }

        if (p != "") {
            return p;
        } else {
            return "home";
        }
    }

    changeUrl(page: string, url: string) {
        if (typeof (history.pushState) != "undefined") {
            var obj = { Page: page, Url: url };
            history.pushState(obj, obj.Page, obj.Url);
        } else {
            window.location.href = "home";
        }
    }

    setHash(x_url: string) {
        var split = x_url.split("/");
        x_url = split[split.length - 1];

        return "p=" + x_url;
    }

    /**** Some getters and setters ****/

    public set hash(hash:string){
        this._hash = hash;
    }


}

export class Model extends SharedModel{
    
}