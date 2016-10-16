/*
Pour le système de pages : 
*/

$(document).ready(doWork); // Quand tout est chargé
window.onhashchange = doWork; // Quand on modifie url#...

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


