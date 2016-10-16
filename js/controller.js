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

		AR.GET('api?res=projects', function(data){
			$('.content').clear();
			try{
				view.createProjectList(JSON.parse(data));
			}catch(error){
				$('.content').html(error.message);
			}
		});

	}else if(page.getTarget() == "project"){

		AR.GET('api?res=project&id='  + page.get('pid') + "&manager=" + page.get("manager"), function (data){
			
			var pdata = JSON.parse(data);

			// On doit faire une vérification

			if (page.get("manager") == "true" && pdata != "UError") {
				
				
				view.createProjectAsManager(pdata);

			// Pas besoin de vérification : l'utilisateur n'aura pas le droit de modifier le projet.

			}else{
				
				view.createProjectAsVisitor(pdata);

			}

		});

	}else{
		content.html('Erreur : cette page n\'existe pas');
	}
}


