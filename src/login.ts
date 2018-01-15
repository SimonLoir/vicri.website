import "./scss/login.scss";
import {SharedModel, UserCredentials} from "./shared.model";
import { $, AR } from "./extjs";

let model = new SharedModel();
model.api_url = "../";

function redirect() {
    window.location.href = "../dashboard-home";
}

model.login(undefined, redirect);

$('#send').click(() => {
    let credentials:UserCredentials = {
        email: $('#user').value(),
        password: $('#password').value(),
        keep_connection:false
    }
    model.login(credentials, redirect, () => {
        alert("Erreur : nom d'utilisateur ou mot de passe incorrect");
    });
});
