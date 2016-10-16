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


