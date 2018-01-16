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