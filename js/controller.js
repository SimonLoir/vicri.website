/*
Pour le système de pages : 
*/
$(document).ready(doWork); // Quand tout est chargé
window.onhashchange = doWork; // Quand on modifie url#...

var content = $('.content');

function doWork(){
	content.clear();
	if (page.getTarget() == "home") {
		
	}else{
		content.html('Erreur : cette page n\'existe pas');
	}
}

$('.put').click(function(){
	AR.PUT("api/header.test.php", {},function (data) {
		$('.content').html(data);
	})
})

$('.post').click(function(){
	AR.POST("api/header.test.php", {},function (data) {
		$('.content').html(data);
	})
})

$('.get').click(function(){
	AR.GET("api/header.test.php", function (data) {
		$('.content').html(data);
	})
})

