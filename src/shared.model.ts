import { AR } from "./extjs";

export interface UserCredentials {
    email: string,
    password: string,
    keep_connection?: boolean
}

export interface ConnectionState {
    isConnected: boolean,
    name?: string,
    email?: string
}

const c_error = "Erreur de communication avec le serveur";

export class SharedModel {

    public api_url: string = "api";

    /**
     * Logs the user in or checks if the user is logged in.
     * @param credentials User's credentials
     * @param callback Success callback
     * @param error_callback Error callback
     */
    public login(credentials: UserCredentials | undefined, callback: (data: ConnectionState) => void, error_callback?: (data?: ConnectionState) => void) {

        if (credentials == undefined) {
            
                AR.GET(this.api_url + 'api?res=login', function (data) {
                    let d: ConnectionState;
                    try {
                         d = JSON.parse(data);
                    } catch (error) {
                        d = {isConnected:false}
                    }
                    if (d.isConnected == true) {
                        if (callback != undefined) {
                            callback(d);
                        }
                    } else if (error_callback != undefined) {
                        error_callback(d);
                    }
                });
            
        } else {
            let user_email = credentials.email;
            let user_password = credentials.password;
            let keep_connection = credentials.keep_connection;

            try {

                AR.POST(this.api_url + 'api/index.php?res=login&keep_connection=' + keep_connection, {
                    user_email: user_email, user_password: user_password
                }, function (data) {
                    let d: ConnectionState;
                    try {
                         d = JSON.parse(data);
                    } catch (error) {
                        d = {isConnected:false}
                    }
                    if (d.isConnected == true) {
                        if (callback != undefined) {
                            callback(d);
                        }
                    } else if (error_callback != undefined) {
                        error_callback();
                    }
                }, function () {
                    alert(c_error)
                });

            } catch (error) {

            }
        }

    }
}

export class P{

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