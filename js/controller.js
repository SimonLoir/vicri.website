/*
Fonctionnement de controller.js

	Au chargement ou quand on modifie l'url,
	on execute la methode user.li_state() qui va exécuter la fonction du controller doWork()
	
		function doWork()

			utilisation de page.getTarget() // exemple : http://vicri.esy.es/vicri#page=home => "home"

			on vérifie si la page existe sinon on affiche une erreur.

			on appelle la méthode correspondante au niveau du model an lui donnant le callback(dans la view) correspondant
*/

$(document).ready(user.li_state); // Quand tout est chargé
window.onhashchange = user.li_state; // Quand on modifie url#...

var content = $('.content');

function doWork(){

	content.html('');

	if (page.getTarget() == "home") {
		
	}else if (page.getTarget() == "videos") {

		model.getAllVideos(view.createVideoList);

	}else if (page.getTarget() == "projets") {

		model.getAllProjects(view.createProjectList);

	}else if(page.getTarget() == "project"){

		model.getProject( view.createProjectAsManager , view.createProjectAsVisitor);

	}else{

		content.html('Erreur : cette page n\'existe pas');

	}
}


