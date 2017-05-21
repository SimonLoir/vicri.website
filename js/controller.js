/**
 * Function that call a loader and user.liSate
 * @callback {document.ready}
 * @callback {window.onhashchange} 
 */
function start() {
	view.load.show('chargement');
	user.liState();
}

$(document).ready(start); // When the page has been loaded
window.onhashchange = start; // When the part after the # in the url has been changed
$(document).ready(view.createHamburgerAndMenu); // When the document is ready : we show an hamburger menu

var content = $('.content');

var controller = {
	/**
	 * Function that load the correct page from the url
	 */
	doWork: function () {

		document.title = "Vicri - " + page.target;

		$('.content').html("");

		if (page.get('action') == "welcome" && user.isConnected == true) {
			view.showConfirmationMessage('Vous êtes maintenant connecté. Bienvenue ' + user.firstname + " !");
		}

		if (page.get('action') == "unf" && page.getTarget() == "login") {
			content.showError("Erreur: l'utilisateur choisi n'est pas valide. ");
		}

		view.addContentToMenu();

		if (page.getTarget() == "home") {
			view.load.hide();

			view.createHomePage();

		} else if (page.getTarget() == "videos") {

			model.getAllVideos(view.createVideoList);

		} else if (page.getTarget() == "calendar") {

			model.getCalendar(view.makeCalendar);

		} else if (page.getTarget() == "projets") {

			model.getAllProjects(view.createProjectList);

		} else if (page.getTarget() == "others") {

			model.getOtherProjects(view.createOtherProjectsPage);

		} else if (page.getTarget() == "photos") {

			model.getAllPhotosFolders(view.createPhotosFoldersList);

		} else if (page.getTarget() == "view_folder") {

			model.getFolderByID(view.createPhotoFolder);

		} else if (page.getTarget() == "project") {

			model.getProject(view.createProjectAsManager, view.createProjectAsVisitor);

		} else if (page.getTarget() == "modify_project") {

			model.getProject(view.modifyProject, function (data) {
				$('.content').showError('Vous ne pouvez pas modifier ce projet');
				view.load.hide();
			}, true);

		} else if (page.getTarget() == "login") {

			view.createLoginPage(model.login);

		} else if (page.getTarget() == "account") {

			view.createAccountPage();

		} else if (page.getTarget() == "new_project") {

			if (user.isConnected == true) {
				view.createNewProjectPage(model.newProject);
			} else {
				view.load.hide();
				$('.content').showError('Vous ne pouvez pas accèder à cette partie du site car vous n\'êtes pas connecté<br /><br /><a href="#page=login" style="color:white;text-decoration:none;border:2px solid white; padding:5px;border-radius:3px;">Me connecter</a>')
			}

		} else if (page.getTarget() == "new_event") {

			view.createNewEventPage(model.newEvent);

		} else if (page.getTarget() == "upload_video") {

			if (page.get('pid') != undefined) {
				view.publish_video(model.publish_video);
			} else {
				$(".content").showError('Une erreur est survenue.');
			}

		} else if (page.getTarget() == "update_account") {

			view.createAccountUpdatePage();

		} else if (page.getTarget() == "create_end_project") {

			if (page.get('pid') != undefined) {
				view.publish_project(model.publish_project);
			} else {
				$(".content").showError('Une erreur est survenue.');
			}

		} else {

			view.load.hide();

			content.showError("Désolé, cette page n'existe pas !");

		}
	}
}