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

		document.title = "Vicri - " + page.target;

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

		}else if(page.getTarget() == "upload_video") {

			if(page.get('pid') != undefined){
				view.publish_video(model.publish_video);
			}else{
				$(".content").showError('Une erreur est survenue.');
			}

		}else{

			view.load.hide();

			content.showError("Désolé, cette page n'existe pas !");

		}
	}
}