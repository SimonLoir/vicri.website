var menu;
var loginInputs;
var theme = "#3f51b5";
var view = {

	/*
	Pre : text != undefined
	*/
	createTitle : function (text){
		var e = $(".content").child("h2");
		e.html(text);
	},createNewEventPage : function (callback){

		var container = $('.content');

		if (user.isConnected != true) {
			container.showError('Vous devez être connecté !');
			view.load.hide();
			return false;
		}

		var e = container.child("div");
		e.addClass('element');

		var form = e.child('form');
		form.node.autocomplete = "off";

		var title = form.input("Nom de l'évènement", "");

		var description = form.textarea("Contenu de l'évènement", "");

		var date = new Date();

		var day = form.selectMinMax('Jour', 1, 31);

		var month = form.selectMinMax('Mois', 1, 12);

		var year = form.selectMinMax('Année', date.getFullYear(), date.getFullYear() + 10);

		var hour = form.selectMinMax('Heure', 0, 23);

		var minute = form.selectMinMax('Minute', 0, 59);

		form.child("br")

		var submit = form.child("input");
		submit.node.type = "submit";
		submit.node.value = "Créer";
		submit.addClass('btn');

		title[0].node.focus();

		form.node.onsubmit = function (){
			//var date = new Date()
			var d_day = day[0].node.options[day[0].node.options.selectedIndex].value;
			var d_month = month[0].node.options[month[0].node.options.selectedIndex].value;
			var d_year = year[0].node.options[year[0].node.options.selectedIndex].value;
			var d_hour = hour[0].node.options[hour[0].node.options.selectedIndex].value;
			var d_minute = minute[0].node.options[minute[0].node.options.selectedIndex].value;

			var real_date = d_year + "-" + d_month + '-' + d_day + ' ' + d_hour + ":" + d_minute + ":00";

			model.newEvent(real_date, title[0].node.value, description[0].node.value);
			return false;
		}

		view.load.hide();

	},
	showConfirmationMessage : function (text, attach_to) {
		if (attach_to == undefined) {
			$(".content").child('div').html(text).addClass('cNotif');
		}else{
			attach_to.child('div').html(text).addClass('cNotif');
		}
	},
	createAccountPage : function () {
		view.load.hide();

		var container = $('.content');

		if(user.isConnected == false){

			$('.content').showError('Désolé, nous ne pouvons pas afficher le contenu de cette page car vous n\'êtes pas connecté');

			return false;
		}

		var e = container.child("div");
		
		e.addClass('element').css('position', "relative");

		e.child('h2').html(user.firstname + " " + user.name);

		e.child('span').html('Email : ' + user.mail);

		e.child('br');

		e.child('span').html('Pseudo : ' + user.pseudo);

		e.child('br');

		e.child('span').html('Google Sign In : activé, vous pouvez vous connecter avec votre compte INDSé via le menu de connexion (se connecter avec google)');

		e.child('br');

		e.child("br");

		e.child('button').addClass('disabled').html('modifier mes informations').click(function(){
			window.location.hash = "page=update_account";
		});

		e.child('button').addClass('disabled').html('mettre à jour mon mot de passe').click(function(){
			window.location.hash = "page=update_password";
		});
	}
	,makeCalendar : function (data, today, days, months) {
		view.load.hide();

		var container = $('.content');

		var e = container.child("div");
		e.addClass('element').css('position', "relative");

		e.child('div').html(today.day).addClass('dayNumber').child('span').html(today.dayName + " " + today.day + " " + today.monthName.toLowerCase()).addClass('plain_text_date');

		e.child("br");e.child("br");e.child("br");e.child("br");

		var c = e.child('div');

		var now = new Date();
		var n = now.getTime();

		for (var i = 0; i < data.length; i++) {

			var ev = data[i];


			var d = new Date(ev.date);

			if (ev.global == 1 && d.getTime() >= n) {
				var ev_container = e.child("div").addClass('ev_c');


				var ev_date = ev_container.child('div').addClass('ev_date').html(d.getDate() + "/" + (d.getMonth() + 1)).css("background", theme);

				var ev_c2 = ev_container.child("div").addClass('cont2');

				var ev_title = ev_c2.child('span').addClass('ev_title').html(ev.title + " (" + d.getHours() + ":" + d.getMinutes() + ')');

				var ev_description = ev_c2.child('p').addClass('ev_description').html(ev.description);
			}


		}


		var plus = e.child('button').addClass('btn3').html('&#43;');
		plus.css('position', "absolute");
		plus.css('top', "15px");
		plus.css('right', "15px");
		plus.css('cursor', "pointer");
		plus.click(function(){window.location.hash = "page=new_event"});

		//alert(today.dayName + " " + today.day + " " + today.monthName.toLowerCase())

	},
	modifyProject : function (data) {
		var container = $('.content');
		view.load.hide();

		var e = container.child("div");
		e.addClass('element');

		var result_messages = e.child('div');
		result_messages.node.id = "x_result_div";

		var form = e.child('form');

		var input = form.input("Nom du projet", data.name);

		var short_description = form.textarea("Brève description du projet", data.shortDescription);

		var description = form.textarea("Description du projet", data.description);

		var progression = form.input('Progression du projet (en %)', data.progression);

		var goals = form.textarea('Objectifs', data.goals);

		var links = form.textarea('Liens', data.links);

			var values = [data.type,"video", "photo", "code","3d", "jeu"];
			var texts = ["Actuel :" + data.type,"Vidéo", "Photo", "Code","3D", "Jeu"];

		var type = form.selectArray('Type de projet', values , texts);

		var send = form.child('input');
		send.node.type = "submit";
		send.node.value = "Modifier";
		send.addClass('btn');

		form.node.onsubmit = function  () {
			view.load.show('mise à jour des informations');
			model.updateProject(input[0].node.value, short_description[0].node.value, description[0].node.value, progression[0].node.value, goals[0].node.value, links[0].node.value, type[0].node.options[type[0].node.selectedIndex].value, data.id);
			return false;
		}

	}
	,
	createHomePage : function () {
		var container = $('.content');

		/*
		Vidéos
		*/

		var e_videos = container.child("div");
		e_videos.node.style.display = "inline-block";
		e_videos.addClass('grid_element');

		e_videos.child('span').html('Vidéos');

		e_videos.child('p').html('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus minus veniam neque ipsam incidunt harum possimus inventore sapiente, aliquam laboriosam! Vel, eligendi provident nostrum itaque voluptate! Est totam, distinctio! Explicabo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet alias quos libero aspernatur reiciendis a eius praesentium ab vero laudantium est et eaque, quasi id sed nemo aperiam amet esse.').addClass('home_e_p');

		var e_video_link = e_videos.child('a');
		e_video_link.node.href = "#page=videos";
		e_video_link.addClass('btn2');
		e_video_link.html("Nos vidéos");

		/*
		Projets
		*/

		var e_projects = container.child("div");
		e_projects.node.style.display = "inline-block";
		e_projects.addClass('grid_element');

		e_projects.child('span').html('Projets');

		e_projects.child('p').html('Lorem ipsum dolor sit amendi provident nostrum itaque voluptate! Est totam, distinctio! Explicabo.').addClass('home_e_p');

		var e_project_link = e_projects.child('a');
		e_project_link.node.href = "#page=projets";
		e_project_link.addClass('btn2');
		e_project_link.html("Nos Projets");

		if (user.isConnected == true) {
			var e_project_new = e_projects.child('a');
			e_project_new.node.href = "#page=new_project";
			e_project_new.addClass('btn2');
			e_project_new.html("Nouveau projet");
		}

		if (user.isConnected == true) {
			var e_calendars = container.child("div");
			e_calendars.node.style.display = "inline-block";
			e_calendars.addClass('grid_element');

			e_calendars.child('span').html('Calendrier');

			e_calendars.child('p').html('Lorem ipsum dolor sit amendi provident nostrum itaque voluptate! Est totam, distinctio! Explicabo.').addClass('home_e_p');

			var e_calendar_link = e_calendars.child('a');
			e_calendar_link.node.href = "#page=calendar";
			e_calendar_link.addClass('btn2');
			e_calendar_link.html("Accèder au calendrier");
		}

		var e_accounts = container.child("div");
			e_accounts.node.style.display = "inline-block";
			e_accounts.addClass('grid_element');

			e_accounts.child('span').html('Mon compte');

			e_accounts.child('p').html('Gérez votre compte vicri, modifiez votre pseudo et votre mot de passe. C\'est ici que vous pouvez gérer vos comptes.').addClass('home_e_p');

			if (user.isConnected == true) {
				var e_account_link = e_accounts.child('a');
				e_account_link.node.href = "#page=account";
				e_account_link.addClass('btn2');
				e_account_link.html("Accèder à mon compte");
			}else{
				var e_account_link = e_accounts.child('a');
				e_account_link.node.href = "#page=login";
				e_account_link.addClass('btn2');
				e_account_link.html("Me connecter");
			}


	}
	,
	createNewProjectPage : function (callback) {

		view.load.hide();

		var container = $(".content").child('div');


		var e = container.child('div');
		e.addClass("element");

		e.child("span").html('Créer un projet').addClass('section_title');

		var form = e.child("form");
		form.node.action = "#";
		form.node.autocomplete = "off";

		var projectname = form.child("div");
		projectname.addClass('field');

		var projectname_text = projectname.child('label');
		projectname_text.html('Nom du projet');
		projectname_text.addClass('top');

		var projectname_input = projectname.child("input");
		projectname_input.addClass('input');

		var project_short_desc = form.child("div");
		project_short_desc.addClass('field');

		var project_short_desc_text = project_short_desc.child('label');
		project_short_desc_text.html('Donnez une brève description du projet');
		project_short_desc_text.addClass('top');

		var project_short_desc_input = project_short_desc.child("textarea");
		project_short_desc_input.addClass('input');

		project_short_desc_input.css('height', "80px");

		var send = form.child("input");
		send.node.type = "submit";
		send.node.value = "Créer le projet *";
		send.addClass('btn');

		form.child('span').html('<br /><br />*Vous pourrez modifier ce projet une fois créé');

		form.node.onsubmit = function () {
			view.load.show('Création du projet')
			if (callback(projectname_input.node.value,project_short_desc_input.node.value) == false) {
				view.load.hide();
			}
			return false;
		}

		view.addInputAnimations();
	}
	,

	addInputAnimations : function () {
		var all = document.querySelectorAll(".input");
    	for (var i = 0; i < all.length; i++) {

    	    all[i].onfocus = function () {
    	        this.parentElement.classList.add('focus');
    	        if(this.parentElement.classList.contains("notempty")){
    	            this.parentElement.classList.remove('notempty');
    	        }
    	    }

    	    all[i].onblur = function(){
    	        this.parentElement.classList.remove('focus');
    	        if(this.value != ""){
    	           this.parentElement.classList.add('notempty');
    	        }
    	    }
    	}
	}

	,
	createLoginPage : function (callback){
		view.load.hide();

		var container = $(".content").child('div');


		var e = container.child('div');
		e.addClass("element");

		var form = e.child("form");
		form.node.action = "#";
		form.node.autocomplete = "off";

		var username = form.child("div");
		username.addClass('field');

		var username_text = username.child('label');
		username_text.html('Email');
		username_text.addClass('top');

		var username_input = username.child("input");
		username_input.addClass('input');

		var password = form.child("div");
		password.addClass('field');

		var password_text = password.child('label');
		password_text.html('Password');
		password_text.addClass('top');

		var password_input = password.child("input");
		password_input.addClass('input');
		password_input.node.type = "password";


		var send = form.child('input');
		send.node.type = "submit";
		send.node.value = "Me connecter";
		send.addClass('btn');

		loginInputs = [username_input,password_input, send];

		form.child('a').html('Me connecter avec Google').node.href = "google";


        form.node.onsubmit = function (){

        	callback(username_input.node.value, password_input.node.value);

        	return false;
        }

        /*e.child("br");
        var loginWithGoogle = e.child('div');
		loginWithGoogle.node.id = "loginbutton_google_sign_in_instance";
		renderButton(loginWithGoogle.node.id);*/

        view.addInputAnimations();

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
		view.load.hide();
		var container = $(".content").child('div');

		/*
		Pour tous les projets de la liste de projets
		*/

		for (var i = 0; i < project_list.length; i++) {
			var project = project_list[i];

			var e = container.child('div');
			e.addClass("element");

			var title = e.child('span');//
			if (project.pined == true) {
				title.html("&#128204; " + project.name);
			}else{
				title.html(project.name);
			}

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
				open.html("Ouvrir");
				open.node.href = "#page=project;pid=" + project.id + ';manager=true';

				var modify_btn = btns.child("a");
				modify_btn.addClass('btn2');
				modify_btn.html("Gérer");
				modify_btn.node.href = "#page=modify_project;pid=" + project.id + ';manager=true';
			}else{
				open.html("Ouvrir");
				open.node.href = "#page=project;pid=" + project.id + ';manager=false';
			}
		}

		if (user.isConnected == true) {
			var plus = container.child('button').addClass('btn3').html('&#43;');
			plus.css('position', "fixed");
			plus.css('bottom', "15px");
			plus.css('right', "15px");
			plus.css('cursor', "pointer");
			plus.click(function(){window.location.hash = "page=new_project"});
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
		view.load.hide();
		var container = $(".content").child('div');
		for (var i = 0; i < data.length; i++) {
			var video = data[i];

			var video_container = container.child("div");
			video_container.node.style.display = "inline-block";
			video_container.addClass('grid_element');

			var iframe  = video_container.child("iframe");
			iframe.node.src = video.url;
			iframe.node.setAttribute('allowfullscreen', "");

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
	publish_video : function (callback) {

		view.load.hide();

		if(user.isConnected != true){
			$('.content').showError('Vous devez être connecté');
			return false;
		}

		var container = $(".content").child('div');

		var e = container.child('div').addClass('element');

		e.child('h2').html('Publier une vidéo.');

		e.child('p').html('Pour publier une vidéo depuis YouTube, vous devez recopier son ID dans la zone de texte ci-dessous. <br /> <i>Exemple :</i> https://www.youtube.com/watch?v=oxa581kKBNg -> l\'ID est oxa581kKBNg');



		var vid = e.input('ID de la vidéo');

		e.child('p').html('Aperçu :')

		var result = e.child('iframe');
		result.css('height', "200px");
		result.css('width', "300px");

		var title = e.input('Titre');
		var description = e.textarea('Description');

		var send = e.child('button');
		send.addClass('btn');
		send.html('Publier');
		
		send.click(function(){
			var vvid = vid[0].node.value.trim();
			var vti = title[0].node.value.trim();
			var vde = description[0].node.value.trim();

			if(vid == "" || vti == "" || vde == ""){
				alert('Merci de remplir tous les champs')
				return false;
			}

			view.load.show('Nous publions cette vidéo ... ');

			callback({
				id : vvid ,
				title : vti ,
				description : vde 
			});
			
		});

		vid[0].blur(function () {
			result.node.src = "https://www.youtube.com/embed/" + $(this).node.value;
		})


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
		view.load.hide();
		var container = $('.content').child("div");
			container.addClass('element');

		document.title = "Vicri - projet : " + data.name;

		var image_and_title = container.child('div');
			image_and_title.createImage(data.name);

			container.child("br");

		var link = container.child('a');
			link.html('Modifier')
			link.node.href = "#page=modify_project;pid=" + page.get('pid') + ";manager=true";
			link.addClass('btn');

		if (data.type == "video") {
			if (data.video == undefined) {
				var publish_video = container.child('a');
				publish_video.html('Publier la vidéo');
				publish_video.addClass('btn');
				publish_video.node.href = "#page=upload_video;pid=" + page.get("pid");
			}else{
				var see_video = container.child('a');
				see_video.html('Afficher la vidéo');
				see_video.addClass('btn');

				see_video.click(function (){
					var full_screen_container = container.child('div');
					full_screen_container.addClass('fs_view');

					var btn_exit = full_screen_container.child('button').html("&#x2715;").addClass('fs_exit');

					btn_exit.click(function() {
						full_screen_container.removeClass('fs_view_visible');
						setTimeout(full_screen_container.remove, 2000);
					});

					var iframe = full_screen_container.child('iframe');
					iframe.node.src = data.video.url;
					iframe.node.setAttribute('allowfullscreen', "");

					full_screen_container.addClass('fs_view_visible');

				});

				var delete_video = container.child('button');
				delete_video.html('supprimer la vidéo');
				delete_video.addClass('btn');

				delete_video.click(function () {

					var r = confirm("Supprimer la vidéo ?");

					if (r == true) {
					   	var r2 = confirm("Êtes vous vraiment sûr de vouloir supprimer cette vidéo?");

						if (r2 == true) {
					   		
							model.delete_video(page.get('pid'));

						} else {

						}

					} else {

					}

				});
			}
		}

		container.child("br");
		container.child("br");

		var project_type = container.child("span");
			project_type.html('Type de projet :' + data.type);

			container.child("br");

		var project_progression = container.child("span");
			project_progression.html('Progression :' + data.progression + " %");

		var project_short_description = container.child("p");
			project_short_description.html('Description courte : ' + data.shortDescription);

		var project_description = container.child("p");
			project_description.html('Description: ' + data.description);


	},
	/*
	Pré :
		data (array)
		{id (int) ,name (string) ,managers (array) ,type (string) ,progression (int) ,pined (int) ,description (string) ,shortDescription (string) ,goals (string) ,links (string)}
	Post :
		Dom elements, HTML
	*/
	createProjectAsVisitor : function(data){
		view.load.hide();
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
		menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;">list</i></span><a href="#page=projets">Projets</a></div>');
		menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;">play_circle_filled</i></span><a href="#page=videos">Vidéos</a></div>');

		if (user.isConnected == true) {
			menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;">account_circle</i></span><a href="#page=account">Mon compte</a></div>');
			menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;">exit_to_app</i></span><a href="api/index.php?res=logout">Me déconnecter</a></div>');
			menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;">date_range</i></span><a href="#page=calendar">Calendrier</a></div>');

		}else{
			menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;">account_circle</i></span><a href="#page=login">Me connecter</a></div>');
		}

		menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;"></i></span>vicri.esy.es</div>');


	}


	,


	 load : {
		element: null,
		mask:null,
		active: false,
		show: function (string) {
		    if (this.active == false) {
		        var loader = document.createElement('div');
		        loader.classList.add('loader');
		        this.element = loader;
		        var e = document.createElement('span');
		        e.classList.add('e');
		        e.classList.add('e1');
		        var e2 = document.createElement('span');
		        e2.classList.add('e');
		        e2.classList.add('e2');
		        var e3 = document.createElement('span');
		        e3.classList.add('e');
		        e3.classList.add('e3');
		        var br = document.createElement('br');
		        var text = document.createElement('span');
		        text.innerHTML = string;
		        var hide = document.createElement('div');
		        hide.style.position = "fixed";
		        hide.style.zIndex = 99;
		        hide.style.background = "rgba(250, 250, 250, 0.79)";
		        hide.style.top = 0;
		        hide.style.bottom = 0;
		        hide.style.left = 0;
		        hide.style.right = 0;

		        this.mask = hide;

		        loader.appendChild(e);
		        loader.appendChild(e2);
		        loader.appendChild(e3);
		        loader.appendChild(br);
		        loader.appendChild(text);
		        document.body.appendChild(hide);

		        document.body.appendChild(loader);
		        this.active = true;
		    }
		},

		hide: function () {
		    try {
		        this.active = false;
		        this.element.parentElement.removeChild(this.element);
		        this.element = null;
		        this.mask.parentElement.removeChild(this.mask);
		        this.mask = null;
		    } catch (e) {

		    }

		}
}

}

// Petite méthode qui est utilisée dans model.createProjectAsVisitor() voir $('.content').createImage(data.name);

ExtJsPlugIn.createImage = function (text){
	var img = document.createElement("img");
	img.src = "https://api.fnkr.net/testimg/" + Math.floor(this.node.offsetWidth) + "x200/" + Math.floor(Math.random()*16777215).toString(16) + "/FFFFFF/?text=" + text;
	img.style.width = "100%";
	this.node.appendChild(img);
	return img;
}

ExtJsPlugIn.showError = function (text) {
	this.html('<div class="error">' + text + '</div>' + this.html());
}

ExtJsPlugIn.input = function (text, value){
	var element = this.child("div");
		element.addClass('field');

		var element_text = element.child('label');
		element_text.html(text);
		element_text.addClass('top');

			var element_input = element.child("input");
			element_input.addClass('input');
		if(value != undefined){
			element_input.node.value = value;
		}

		view.addInputAnimations();

		element_input.node.focus();
		element_input.node.blur();

	return [element_input, element];
}

ExtJsPlugIn.textarea = function (text, value){
	var element = this.child("div");
		element.addClass('field');

		var element_text = element.child('label');
		element_text.html(text);
		element_text.addClass('top');

		var element_input = element.child("textarea");
		element_input.addClass('input');
		if(value != undefined){
			element_input.node.value = value;
		}

		view.addInputAnimations();

		element_input.node.focus();
		element_input.node.blur();

	return [element_input, element];
}


ExtJsPlugIn.selectMinMax = function (text, min, max){
	var element = this.child("div");
		element.addClass('field').addClass('notempty').addClass('ib-80');

		var element_text = element.child('label');
		element_text.html(text);
		element_text.addClass('top');

		var element_input = element.child("select");

		var select = element_input.node;

		for (var i = min; i<=max; i++){
		    var opt = document.createElement('option');
		    opt.value = i;
		    opt.innerHTML = i;
		    select.appendChild(opt);
		}


		view.addInputAnimations();

		element_input.node.focus();
		element_input.node.blur();

	return [element_input, element];
}

ExtJsPlugIn.selectArray = function (text, array, texts){
	var element = this.child("div");
		element.addClass('field').addClass('notempty');

		var element_text = element.child('label');
		element_text.html(text);
		element_text.addClass('top');

		var element_input = element.child("select");

		var select = element_input.node;

		for (var i = 0; i < array.length; i++) {
			//array[i]
			var opt = document.createElement('option');
		    opt.value = array[i];
		    opt.innerHTML = texts[i];
		    select.appendChild(opt);
		}

		view.addInputAnimations();

		element_input.node.focus();
		element_input.node.blur();

	return [element_input, element];
}
