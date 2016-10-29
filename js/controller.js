/*
Fonctionnement de controller.js

	Au chargement ou quand on modifie l'url,
	on execute la methode user.liState() qui va exécuter la fonction du controller doWork()
	
		function doWork()

			utilisation de page.getTarget() // exemple : http://vicri.esy.es/vicri#page=home => "home"

			on vérifie si la page existe sinon on affiche une erreur.

			on appelle la méthode correspondante au niveau du model an lui donnant le callback(dans la view) correspondant
*/

function start() {
	user.liState();
	view.load.show('chargement');
}

$(document).ready(start); // Quand tout est chargé
window.onhashchange = start;
$(document).ready(view.createHamburgerAndMenu);

var content = $('.content');

function doWork(){

	content.html('');

	view.addContentToMenu();



	if (page.getTarget() == "home") {
		view.load.hide();
	}else if (page.getTarget() == "videos") {

		model.getAllVideos(view.createVideoList);

	}else if (page.getTarget() == "projets") {

		model.getAllProjects(view.createProjectList);

	}else if(page.getTarget() == "project"){

		model.getProject( view.createProjectAsManager , view.createProjectAsVisitor);

	}else if(page.getTarget() == "login"){

		view.createLoginPage(model.login);

	}else{

		view.load.hide();

		content.showError("Désolé, cette page n'existe pas !");

	}
}

var controller = {
	onProjectEditButtonClick : function (button){
		var type = button.node.parentElement.view_element_type;
		view.popup(type);
	},
	onPopupConfirm(type, input){
		
	}
}

var google_user_id;
var google_user_mail;

function onSuccess(googleUser) {

	var profile = googleUser.getBasicProfile();
	google_user_id = profile.getId(); // Do not send to your backend! Use an ID token instead.
	google_user_mail = profile.getEmail();
	 var id_token = googleUser.getAuthResponse().id_token;
	model.loginWithGoogle(id_token);

}

function onFailure(error) {
  console.log(error);
}
function renderButton(id) {
  gapi.signin2.render(id, {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}