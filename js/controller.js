$(document).ready(doWork);
window.onhashchange = doWork;

function doWork(){
	console.log("Sélection de la page");
	if (page.getTarget() == "home") {
		$('.content').html("Bienvenue");
	}else{
		$(".content").html('Erreur : cette page n\'existe pas')
	}
}

