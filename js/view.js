var menu;
var view = {

	/*
	Pre : text != undefined
	*/
	createTitle : function (text){
		var e = $(".content").child("h2");
		e.html(text);
	}
	,
	/*
	Pre : 
		project_list (array)
		voir documentation (?res=projects)
		[{id (int), name (string), managers (array), progression (int), pined (int), shortDescription (string), user_is_manager (bool)}, {project}, {project}]
	POST : 
		+ nodes => HTML , DOM elements
	*/
	createProjectList : function (project_list) {
		var container = $(".content").child('div');

		/*
		Pour tous les projets de la liste de projets
		*/

		for (var i = 0; i < project_list.length; i++) {
			var project = project_list[i];

			var e = container.child('div');
			e.addClass("element");

			var title = e.child('span');
			title.html(project.name);

			var progress = e.child("span");
            progress.html(project.progression + "%");
            progress.addClass('progress');
			
			var progress__style = progress.node.style;
            progress__style.display = "inline-block";
            
            if  (project.progression > 90){
                progress__style.background = "#286928";
            }else if  (project.progression >= 50){
                progress__style.background = "#d18217";
            }else{
                progress__style.background = "#eb1515";
            }
            progress__style.color = "white";
            progress__style.padding = "3px";

			var description = e.child('p');
			description.html(project.shortDescription);

			var btns = e.child('div');
			btns.css('display', "block");
			btns.css('height', "32px");

			var open = btns.child("a");
			open.addClass('btn2');


			if (project.user_is_manager == true) {
				open.html("Gérer");
				open.node.href = "#page=project;pid=" + project.id + ';manager=true';
			}else{
				open.html("Ouvrir");
				open.node.href = "#page=project;pid=" + project.id + ';manager=false';
			}
		}
	},
	/*
	Pré :
		data (array)
		[{id (int) ,url (string) ,provider (string) ,title (string) ,description (string)} , {video}] 
	Post : 
		Dom elements, HTML
	*/
	createVideoList : function(data){
		var container = $(".content").child('div');
		for (var i = 0; i < data.length; i++) {
			var video = data[i];

			var video_container = container.child("div");
			video_container.node.style.display = "inline-block";
			video_container.addClass('grid_element');

			var iframe  = video_container.child("iframe");
			iframe.node.src = video.url;

			var open = video_container.child("a");
			open.addClass('btn2')
			open.node.href = "#page=project;pid=" + video.id + ';manager=false';
			open.html('Accèder au projet');

			var information_button = video_container.child('button');
			information_button.addClass("btn2");
			information_button.node.style.color = "rgba(0,0,0,0.65)";
			information_button.node.style.float = "left";
			information_button.node.style.paddingLeft = "5px";

			information_button.click(function(){
				view.videoShowInformations(video);
			});

			information_button.html('<i class="material-icons">info</i> infos');
		}
	},
	videoShowInformations : function (video){
		alert('Informations sur la vidéo : \n Titre :' + video.title + "\n Description :" + video.description + "\n Url :" + video.url);
	}
	,

	/*
	Pré :
		data (array) 
		{id (int) ,name (string) ,managers (array) ,type (string) ,progression (int) ,pined (int) ,description (string) ,shortDescription (string) ,goals (string) ,links (string)} 
	Post : 
		Dom elements, HTML
	*/

	createProjectAsManager : function(data){
		var container = $('.content').child("div");
		container.addClass('element');

		var image_and_title = container.child('div');
		image_and_title.createImage(data.name);

		container.child("br");

		var project_type = container.child("span");
		project_type.html('Type de projet :' + data.type);
		project_type.node.view_element_type = "type";

		container.child("br"); // On ne le conserve pas dans une variable 

		var project_progression = container.child("span");
		project_progression.html('Progression :' + data.progression + " %");
		project_progression.node.view_element_type = "progression";

		var project_short_description = container.child("p");
		project_short_description.html('Description courte : ' + data.shortDescription);
		project_short_description.node.view_element_type = "sdescription";

		var project_description = container.child("p");
		project_description.html('Description: ' + data.description);
		project_description.node.view_element_type = "description";

		var elements = [project_type, project_progression, project_short_description, project_description];

		for (var i = 0; i < elements.length; i++) {
			var btn = elements[i].child('button');
			btn.html('Modifier');
			btn.addClass("edit");
			btn.click(function (){
				controller.onProjectEditButtonClick($(this));
			});
		}

	},
	/*
	Pré :
		data (array) 
		{id (int) ,name (string) ,managers (array) ,type (string) ,progression (int) ,pined (int) ,description (string) ,shortDescription (string) ,goals (string) ,links (string)} 
	Post : 
		Dom elements, HTML
	*/
	createProjectAsVisitor : function(data){
		if (data == "UError") {
			$('.content').html('<div class="error">Erreur : utilisateur non connecté ou ne participant pas au projet</div>');
			return false;
		}

		var container = $('.content').child("div");
		container.addClass('element');

		var image_and_title = container.child('div');
		image_and_title.createImage(data.name);


		var project_type = container.child("span");
		project_type.html('Type de projet :' + data.type);

		container.child("br"); // On ne le conserve pas dans une variable 

		var project_progression = container.child("span");
		project_progression.html('Progression :' + data.progression + " %");

		var project_description = container.child("p");
		project_description.html('Description: ' + data.description);
	},
	/*
	PRE : 
		type = type || progression || sdescription || description 
	POST :
		new popup
	*/
	popup : function (type){

		var mask = $("body").child('div');
		mask.addClass('mask');

		var popup = $("body").child('div');
		popup.addClass('popup');

		var form = popup.child('div');

		/*
			Fermeture du popup
		*/

		var exit = popup.child('span');
		exit.html('×');
		exit.addClass('exit');

		exit.click(function(){popup.remove();mask.remove();});

		/*
			Actions relatives au type
		*/

		if (type == "type") {
			form.child('span').html('Sélectionnez le type de projet : <br />');

			var select = form.child('select');
			select.node.options[0] = new Option("Vidéo", 0);
			select.node.options[1] = new Option("Photo", 1);
			select.node.options[2] = new Option("Programmation", 2);
			select.node.options[3] = new Option("Autre", 3);

			form.node.onsubmit = function () {
				controller.onPopupConfirm(type, select.node);
			}
		}

		var send = form.child('input');
		send.node.type = "submit";


	},

	createHamburgerAndMenu : function () {
		menu = document.createElement('div');
		document.body.appendChild(menu);
		menu.classList.add('left_menu');

		$(menu).click(function (e) {
			$('.hamburger').click();
		});

		/* On crée l'hamburger du menu */
		$('.hamburger').click(function () {
		    if (this.classList.contains('clicked')) {
		        $(this).removeClass('clicked');
		        $(this).addClass('none');
		        menu.classList.remove('open')
		    } else {
		        $(this).removeClass('none');
		        $(this).addClass('clicked');   
		        menu.classList.add('open');
		    };
		    
		});
	},

	addContentToMenu : function () {
		$(menu).html('');

		var menu_app = $(menu).child("div");
		menu_app.addClass('menu_app');

		menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;">home</i></span><a href="#page=home">Home</a></div>');
		menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;">account_circle</i></span><a href="#page=projets">Projets</a></div>');
		menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;">play_circle_filled</i></span><a href="#page=videos">Vidéos</a></div>');
		menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;"></i></span>vicri.esy.es</div>');
		

	}

}

// Petite méthode qui est utilisée dans model.createProjectAsVisitor() voir $('.content').createImage(data.name);

ExtJsPlugIn.createImage = function (text){
	var img = document.createElement("img");
	img.src = "https://api.fnkr.net/testimg/150x150/" +Math.floor(Math.random()*16777215).toString(16) + "/FFFFFF/?text=" + text;
	img.style.maxWidth = "99%";
	this.node.appendChild(img);
	return img;
}

ExtJsPlugIn.showError = function (text) {
	this.html('<div class="error">' + text + '</div>');
}

