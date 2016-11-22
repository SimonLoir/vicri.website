/*
Fonctionnement de controller.js

	Au chargement ou quand on modifie l'url,
	on execute la methode user.liState() qui va exécuter la fonction du controller doWork()
	
		function doWork()

			utilisation de page.getTarget() // exemple : http://vicri.esy.es/vicri#page=home => "home"

			on vérifie si la page existe sinon on affiche une erreur.

			on appelle la méthode correspondante au niveau du model an lui donnant le callback (dans la view) correspondant
*/

function start() {
	view.load.show('chargement');
	user.liState();
}

$(document).ready(start); // Quand tout est chargé
window.onhashchange = start;
$(document).ready(view.createHamburgerAndMenu);

var content = $('.content');


var controller = {
	doWork : function (){

		$('.content').html("");

		if (page.get('action') == "welcome" && user.isConnected == true) {
			view.showConfirmationMessage('Vous êtes maintenant connecté. Bienvenue ' + user.firstname + " !");
		}

		view.addContentToMenu();
		
		if (page.getTarget() == "home") {
			view.load.hide();

			view.createHomePage();
			
		}else if (page.getTarget() == "videos") {

			model.getAllVideos(view.createVideoList);

		}else if (page.getTarget() == "calendar") {

			model.getCalendar(view.makeCalendar);

		}else if (page.getTarget() == "projets") {

			model.getAllProjects(view.createProjectList);

		}else if(page.getTarget() == "project"){

			model.getProject( view.createProjectAsManager , view.createProjectAsVisitor);

		}else if(page.getTarget() == "modify_project"){

			model.getProject( view.modifyProject , function (data) {
				$('.content').showError('Vous ne pouvez pas modifier ce projet');
				view.load.hide();
			}, true);

		}else if(page.getTarget() == "login"){

			view.createLoginPage(model.login);

		}else if(page.getTarget() == "account"){

			view.createAccountPage();

		}else if(page.getTarget() == "new_project"){

			if (user.isConnected == true) {
				view.createNewProjectPage(model.newProject);
			}else{
				view.load.hide();
				$('.content').showError('Vous ne pouvez pas accèder à cette partie du site car vous n\'êtes pas connecté<br /><br /><a href="#page=login" style="color:white;text-decoration:none;border:2px solid white; padding:5px;border-radius:3px;">Me connecter</a>')
			}

		}else if(page.getTarget() == "new_event"){

			view.createNewEventPage(model.newEvent);

		}else{

			view.load.hide();

			content.showError("Désolé, cette page n'existe pas !");

		}
	}
}






/*

A utiliser plus tard

*/
var google_user_id;
var google_user_mail;

function onSuccess(googleUser) {

	var profile = googleUser.getBasicProfile();
	google_user_id = profile.getId(); // Do not send to your backend! Use an ID token instead.
	google_user_mail = profile.getEmail();
	var id_token = googleUser.getAuthResponse().id_token;

	alert('La connnexion avec Google est indisponible pour le moment');

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