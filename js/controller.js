$(document).ready(doWork);
window.onhashchange = doWork;

var content = $('.content');
function doWork(){
	console.log("Sélection de la page");
	if (page.getTarget() == "home") {
		
	}else{
		content.html('Erreur : cette page n\'existe pas');
	}
}

