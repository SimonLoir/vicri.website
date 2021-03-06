import './scss/login.scss';
import { SharedModel, UserCredentials, ConnectionState } from './shared.model';
import { $, AR } from './extjs';

let model = new SharedModel();
model.api_url = '../';

function redirect(data: ConnectionState) {
    if (data.isAdmin == true) {
        //@ts-ignore
        window.location.href = '../dashboard-admin#login';
        return;
    }
    //@ts-ignore
    window.location.href = '../dashboard-home';
}

model.login(undefined, redirect);

$('#send').click(() => {
    let credentials: UserCredentials = {
        email: $('#user').value(),
        password: $('#password').value(),
        keep_connection: false
    };
    model.login(credentials, redirect, () => {
        alert("Erreur : nom d'utilisateur ou mot de passe incorrect");
    });
});
