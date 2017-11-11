var menu;
var loginInputs;
var theme = "#3f51b5";
var view = {
	/**
	 * Creates an HTML h2 element
	 * @param {String} text text to put inside the h2
	 */
	createTitle: function (text) {
		var e = $(".content").child("h2");
		e.html(text);
	},
	/**
	 * Creates a page that allows the user to create a new event in the calendar
	 * @param {view~createNewEventCallback|Function} callback that is called when the suer submit the form 
	 */
	createNewEventPage: function (callback) {


		var container = $('.content');

		if (user.isConnected != true) {
			container.showError('Vous devez être connecté !');
			view.load.hide();
			return false;
		}

		if (user.mail.indexOf("indse.be") < 0) {
			$('.content').showError('Votre adresse email n\'est pas éligible à la création d\'events');
			view.load.hide();
			return;
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

		form.node.onsubmit = function () {
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
	/**
	 * Creates a folder of pictures
	 * @param {Array} data list of images that are into the folder
	 */
	createPhotoFolder: function (data) {

		var container = $('.content');

		for (var i = 0; i < data.length; i++) {
			var element = data[i];

			var img = container.child('img');
			img.node.src = element.path;
			img.css('max-width', "200px");
			img.css('max-height', "200px");
			img.css("margin", "25px");
			img.css('cursor', "pointer");
			img.css('vertical-align', "middle");

			img.click(function () {
				var full_screen_container = container.child('div');
				full_screen_container.addClass('fs_view');

				var btn_exit = full_screen_container.child('button').html("&#x2715;").addClass('fs_exit');

				btn_exit.click(function () {
					full_screen_container.removeClass('fs_view_visible');
					setTimeout(function () {
						full_screen_container.remove();
					}, 2000);
				});

				full_screen_container.addClass('fs_view_visible');
				full_screen_container.css("background", "rgba(255,255,255,0.75)");

				var img_inside = full_screen_container.child('img');
				img_inside.node.src = this.src;
				img_inside.css('position', "absolute");
				img_inside.css('top', "50%");
				img_inside.css('left', "50%");
				img_inside.css('max-width', "90%");
				img_inside.css('max-height', "90%");
				img_inside.css('height', "100%");
				img_inside.css('box-shadow', "0px 0px 15px rgba(0,0,0,0.54)");
				img_inside.css('transform', "translateX(-50%) translateY(-50%)");

			})
		}

	},
	/**
	 * Shows a confirmation message
	 * //to be continued :-)
	 */
	showConfirmationMessage: function (text, attach_to) {
		if (attach_to == undefined) {
			$(".content").child('div').html(text).addClass('cNotif');
		} else {
			attach_to.child('div').html(text).addClass('cNotif');
		}
	},
	/* ---------------------------------------- /*
			Account management page creation
	/* ---------------------------------------- */
	createAccountPage: function () {
		view.load.hide();

		var container = $('.content');

		if (user.isConnected == false) {

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

		if (user.mail.indexOf("@indse.be") >= 0) {
			e.child('span').html('Google Sign In : activé, vous pouvez vous connecter avec votre compte INDSé via le menu de connexion (se connecter avec google)');

			e.child('br');

			e.child("br");

			e.child('button').addClass('btn').html('modifier mes informations').click(function () {
				window.location.hash = "page=update_account";
			});

		} else if (user.mail.indexOf("@gmail.com") >= 0) {
			e.child('span').html('Google Sign In : activé, vous pouvez vous connecter avec votre compte GMAIL via le menu de connexion (se connecter avec google)');
			e.child("br"); e.child("br");
		} else {
			e.child('span').html('Google Sign In : désactivé, vous devez utiliser une autre méthode de connexion (Me connecter autrement)');
			e.child("br"); e.child("br");
		}


	}
	,//createAccountUpdatePage
	createAccountUpdatePage: function () {
		view.load.hide();

		var container = $('.content');

		if (user.isConnected == false) {

			$('.content').showError('Désolé, nous ne pouvons pas afficher le contenu de cette page car vous n\'êtes pas connecté');

			return false;
		}

		if (user.mail.indexOf("indse.be") < 0) {
			$('.content').showError('Vous ne pouvez pas modifier votre adresse email, votre adresse n\'est pas une adresse @indse.be');
			view.load.hide();
			return;
		}




		var e = container.child("div");

		e.addClass('element').css('position', "relative");

		e.child('h2').html(user.firstname + " " + user.name);

		e.child('p').html('Cette page est réservée aux rhétos. Grâce à celle-ci, ils pourront mettre à jour leur adresse email et ainsi garder un accès (restreint) au site lorsqu\'ils quitteront l\'école');

		e.child('span').html('Email : ' + user.mail);

		var x = e.child("p");

		var modify = x.child('button').addClass('btn').html('Modifier mon adresse email.');

		modify.click(function () {

			var abort = function () {
				alert("Action annulée");
			}

			view.newPopup('Votre nouvelle adresse email', "text", function (email) {

				view.newPopup('Répetez votre adresse email', "text", function (email2) {

					if (email != email2 || email2.trim() == "") {
						alert('Vos adresses doivent être les mêmes et ne peuvent être vides');
						return abort();
					}

					view.newPopup('Votre mot de passe', "password", function (password) {

						view.newPopup('Votre mot de passe (répétez)', "password", function (password2) {

							if (password != password2) {
								alert('Vos mots de passe doivent être identiques');
								return abort();
							}

							if (password.length < 6) {
								alert('Un mot de passe sécurisé compte au moins 6 caractères');
								return abort();
							}

							AR.PUT('api/index.php?res=update_account', { email: email, password: password }, function (data) {

								if (data == "ok") {
									alert('Modifié avec suucès.');
									alert('Reconnectez vous avec vos nouveaux indentifiants');

									window.location.href = '#page=login';

								}

							});

						}, abort);

					}, abort);


				}, abort);

			}, abort);

		});


	}
	,
	/* ---------------------------------------- /*
				Calendar page creation
	/* ---------------------------------------- */
	makeCalendar: function (data, today, days, months) {
		view.load.hide();

		var container = $('.content');

		var e = container.child("div");
		e.addClass('element').css('position', "relative");

		e.child('div').html(today.day).addClass('dayNumber').child('span').html(today.dayName + " " + today.day + " " + today.monthName.toLowerCase()).addClass('plain_text_date');

		e.child("br"); e.child("br"); e.child("br"); e.child("br");

		var c = e.child('div');

		var now = new Date();
		var n = now.getTime();

		for (var i = 0; i < data.length; i++) {

			var ev = data[i];

			let event_id = ev.id;

			var d = new Date(ev.date);

			if (ev.global == 1 && d.getTime() >= n) {
				var ev_container = e.child("div").addClass('ev_c').click(function () {
					if (user.isConnected) {
						window.location.hash = "page=update_event;eid=" + event_id;
					}
				});

				ev_container.css('cursor', "pointer");

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
		plus.click(function () { window.location.hash = "page=new_event" });

		//alert(today.dayName + " " + today.day + " " + today.monthName.toLowerCase())

	},


	/* --------------------------------------------------------------- /*
			Project modification page management page creation
	/* --------------------------------------------------------------- */

	modifyProject: function (data) {
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

		var values = [data.type, "video", "photo", "code", "3d", "jeu"];
		var texts = ["Actuel :" + data.type, "Vidéo", "Photo", "Code", "3D", "Jeu"];

		var type = form.selectArray('Type de projet', values, texts);

		var send = form.child('button');
		send.node.type = "submit";
		send.html('Mettre à jour <i class="material-icons">send</i>');
		send.addClass('btn');

		form.node.onsubmit = function () {
			view.load.show('mise à jour des informations');
			model.updateProject(input[0].node.value, short_description[0].node.value, description[0].node.value, progression[0].node.value, goals[0].node.value, links[0].node.value, type[0].node.options[type[0].node.selectedIndex].value, data.id);
			return false;
		}

	}
	,

	/* ---------------------------------------- /*
				Home page creation
	/* ---------------------------------------- */
	createHomePage: function () {
		var container = $('.content');

		/*
		-> Vidéos
		*/

		var e_videos = container.child("div");
		e_videos.node.style.display = "inline-block";
		e_videos.addClass('grid_element');

		e_videos.child('span').html('Vidéos');

		e_videos.child('p').html('Vidéos réalisées par le groupe vicri de l\'INDSé 2e&3e degrés').addClass('home_e_p');

		var e_video_link = e_videos.child('a');
		e_video_link.node.href = "#page=videos";
		e_video_link.addClass('btn2');
		e_video_link.html("Nos vidéos");

		/*
		-> Photos
		*/

		var e_photos = container.child("div");
		e_photos.node.style.display = "inline-block";
		e_photos.addClass('grid_element');

		e_photos.child('span').html('Photos');

		e_photos.child('p').html('Photos réalisées par le groupe vicri de l\'INDSé 2e&3e degrés').addClass('home_e_p');

		var e_photo_link = e_photos.child('a');
		e_photo_link.node.href = "#page=photos";
		e_photo_link.addClass('btn2');
		e_photo_link.html("Nos photos");
		e_photo_link.node.href = "#page=photos";


		/*
		-> others
		*/

		var e_others = container.child("div");
		e_others.node.style.display = "inline-block";
		e_others.addClass('grid_element');

		e_others.child('span').html('Autres');

		e_others.child('p').html('Autres projets réalisés par le groupe vicri de l\'INDSé 2e&3e degrés tels que des modélisations 3d, des jeux, des pages/sites web, etc...').addClass('home_e_p');

		var e_other_link = e_others.child('a');
		e_other_link.node.href = "#page=others";
		e_other_link.addClass('btn2');
		e_other_link.html("Nos autres projets");


		/*
		-> Projets
		*/
		if (user.isConnected == true) {
			var e_projects = container.child("div");
			e_projects.node.style.display = "inline-block";
			e_projects.addClass('grid_element');

			e_projects.child('span').html('Projets');

			e_projects.child('p').html('Liste des projets').addClass('home_e_p');

			var e_project_link = e_projects.child('a');
			e_project_link.node.href = "#page=projets";
			e_project_link.addClass('btn2');
			e_project_link.html("Nos Projets");


			var e_project_new = e_projects.child('a');
			e_project_new.node.href = "#page=new_project";
			e_project_new.addClass('btn2');
			e_project_new.html("Nouveau projet");
		}
		/*
		-> Calendar
		*/
		if (user.isConnected == true) {
			var e_calendars = container.child("div");
			e_calendars.node.style.display = "inline-block";
			e_calendars.addClass('grid_element');

			e_calendars.child('span').html('Calendrier');

			e_calendars.child('p').html('Liste des prochains évènements.').addClass('home_e_p');

			var e_calendar_link = e_calendars.child('a');
			e_calendar_link.node.href = "#page=calendar";
			e_calendar_link.addClass('btn2');
			e_calendar_link.html("accéder au calendrier");
		}
		/*
		-> Account
		*/
		var e_accounts = container.child("div");
		e_accounts.node.style.display = "inline-block";
		e_accounts.addClass('grid_element');

		e_accounts.child('span').html('Mon compte');

		e_accounts.child('p').html('accéder à l\'espace membre.').addClass('home_e_p');

		if (user.isConnected == true) {
			var e_account_link = e_accounts.child('a');
			e_account_link.node.href = "#page=account";
			e_account_link.addClass('btn2');
			e_account_link.html("mon compte");

			var e_account_link_lo = e_accounts.child('a');
			e_account_link_lo.node.href = "api/index.php?res=logout";
			e_account_link_lo.addClass('btn2');
			e_account_link_lo.html("Me déconnecter");
		} else {
			var e_account_link = e_accounts.child('a');
			e_account_link.node.href = "#page=login";
			e_account_link.addClass('btn2');
			e_account_link.html("Me connecter");
		}


		var e_github = container.child("div");
		e_github.node.style.display = "inline-block";
		e_github.addClass('grid_element');

		e_github.child('span').html('Github');

		e_github.child('p').html('Vous pouvez retrouver la totalité du projet vicri.esy.es sur Github, voir son code source, sa documentation, le fonctionnement de son API, etc...').addClass('home_e_p');

		var e_github_link = e_github.child('a');
		e_github_link.node.href = "https://github.com/SimonLoir/vicri2.0";
		e_github_link.addClass('btn2');
		e_github_link.html("Retrouver sur Github");

	}
	, createOtherProjectsPage: function (data) {
		var container = $('.content');


		for (var i = 0; i < data.length; i++) {
			var element = data[i];

			var folder = container.child('div').addClass('img_folder');
			folder.css('display', "inline-block");

			var img = folder.child('div').addClass('img');
			img.css('background', "url(resources/images/" + element.image + ") no-repeat");
			img.css('background-position', "center");
			img.css('background-size', "cover");

			var text_area = folder.child('div').addClass('text-area');

			text_area.child('span').html(element.name).addClass('title');

			text_area.child('div').html(element.description.substr(0, 200)).addClass('description');

			var btn_containers = folder.child('div');
			btn_containers.addClass("btn_container");

			var open = btn_containers.child("a");
			open.addClass('btn2')
			open.html('Voir plus');
			open.node.href = element.link;

		}
	}

	,

	/* --------------------------------------------- /*
			Project creation page creation
	/* --------------------------------------------- */
	createNewProjectPage: function (callback) {

		view.load.hide();

		var container = $(".content").child('div');

		if (user.mail.indexOf("indse.be") < 0) {
			$('.content').showError('Votre adresse email n\'est pas éligible à la création de projets');
			return;
		}

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
			if (callback(projectname_input.node.value, project_short_desc_input.node.value) == false) {
				view.load.hide();
			}
			return false;
		}

		view.addInputAnimations();
	}
	,

	/* ---------------------------------------- /*
			input animations addition
	/* ---------------------------------------- */
	addInputAnimations: function () {
		var all = document.querySelectorAll(".input");
		for (var i = 0; i < all.length; i++) {

			all[i].onfocus = function () {
				this.parentElement.classList.add('focus');
				if (this.parentElement.classList.contains("notempty")) {
					this.parentElement.classList.remove('notempty');
				}
			}

			all[i].onblur = function () {
				this.parentElement.classList.remove('focus');
				if (this.value != "") {
					this.parentElement.classList.add('notempty');
				}
			}
		}
	}

	,

	/* ---------------------------------------- /*
			Login page creation
	/* ---------------------------------------- */
	createLoginPage: function (callback) {
		view.load.hide();

		var container = $(".content").child('div');



		var e = container.child('div');
		e.addClass("element");

		e.child('h2').html('Choisir une méthode de connexion')
		//form.child('p').html('Pour vous connecter avec votre adresse @indse.be, utilisez le bouton me connecter avec google et ne remplissez pas les champs Email et Password.').css("color", "crimson");

		var google_login = e.child('a').html('Me connecter avec Google');
		google_login.node.href = "google";
		google_login.addClass('btn');

		var login_without_google = e.child('button').html('Me connecter autrement');
		login_without_google.addClass('btn');


		var form = e.child("form");
		form.node.action = "#";
		form.node.autocomplete = "off";
		form.css('display', "none");

		e.child('br');
		e.css('padding-bottom', "20px");

		login_without_google.click(function () {

			form.css('display', "block");
			$(this).remove();
			e.css('padding-bottom', "0px");

		});


		var input_group = form.child('div');

		var username = input_group.child("div");
		username.addClass('field');

		var username_text = username.child('label');
		username_text.html('Email');
		username_text.addClass('top');

		var username_input = username.child("input");
		username_input.addClass('input');

		var password = input_group.child("div");
		password.addClass('field');

		var password_text = password.child('label');
		password_text.html('Password');
		password_text.addClass('top');

		var password_input = password.child("input");
		password_input.addClass('input');
		password_input.node.type = "password";


		var send = input_group.child('input');
		send.node.type = "submit";
		send.node.value = "Me connecter";
		send.addClass('btn');

		loginInputs = [username_input, password_input, send];




		form.node.onsubmit = function () {

			callback(username_input.node.value, password_input.node.value);

			return false;
		}
		view.addInputAnimations();

	}
	,

	/* ---------------------------------------- /*
			All projects page creation
	/* ---------------------------------------- */
	createProjectList: function (project_list) {
		view.load.hide();
		var container = $(".content").child('div');

		for (var i = 0; i < project_list.length; i++) {
			var project = project_list[i];

			var e = container.child('div');
			e.addClass("element");
			e.addClass("project");

			var title = e.child('span');//
			if (project.pined == true) {
				title.html("&#128204; " + project.name);
			} else {
				title.html(project.name);
			}

			var progress = e.child("span");
			progress.html(project.progression + "%");
			progress.addClass('progress');

			var progress__style = progress.node.style;
			progress__style.display = "inline-block";

			if (project.progression > 90) {
				progress__style.background = "#286928";
			} else if (project.progression >= 50) {
				progress__style.background = "#d18217";
			} else {
				progress__style.background = "#eb1515";
			}

			progress__style.color = "white";

			var description = e.child('p');
			description.html(project.shortDescription);

			var btns = e.child('div');
			btns.css('display', "block");
			btns.css('height', "32px");
			btns.addClass('bottom');

			var open = btns.child("a");
			open.addClass('btn2');

			if (project.user_is_manager == true) {
				open.html("Ouvrir");
				open.node.href = "#page=project;pid=" + project.id + ';manager=true';

				var modify_btn = btns.child("a");
				modify_btn.addClass('btn2');
				modify_btn.html("Modifier");
				modify_btn.node.href = "#page=modify_project;pid=" + project.id + ';manager=true';
			} else {
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
			plus.click(function () { window.location.hash = "page=new_project" });
		}
	},

	/* ---------------------------------------- /*
			All videos page creation
	/* ---------------------------------------- */
	/**
	 * Show a list of videos
	 * @callback model~getVideosCallback
	 * @param {Array} data list of all the videos that are in the database 
	 */
	createVideoList: function (data) {
		view.load.hide();
		var container = $(".content").child('div');
		for (var i = 0; i < data.length; i++) {
			var video = data[i];

			var video_container = container.child("div");
			video_container.node.style.display = "inline-block";
			video_container.addClass('grid_element');

			var iframe = video_container.child("iframe");
			iframe.node.src = video.url;
			iframe.node.setAttribute('allowfullscreen', "");

			var open = video_container.child("a");
			open.addClass('btn2')
			open.node.href = "#page=project;pid=" + video.id + ';manager=false';
			open.html('accéder au projet');

			var information_button = video_container.child('button');
			information_button.addClass("btn2");
			information_button.node.style.color = "rgba(0,0,0,0.65)";
			information_button.node.style.float = "left";
			information_button.node.style.paddingLeft = "5px";

			information_button.click(function () {
				view.videoShowInformations(video);
			});

			information_button.html('<i class="material-icons">info</i> infos');
		}
	},

	/* --------------------------------------------------- /*
				Show informations about the video
	/* --------------------------------------------------- */
	videoShowInformations: function (video) {
		alert('Informations sur la vidéo : \n Titre :' + video.title + "\n Description :" + video.description + "\n Url :" + video.url);
	}
	,

	/* ---------------------------------------- /*
			Video publishing page creation
	/* ---------------------------------------- */
	publish_video: function (callback) {

		view.load.hide();

		if (user.isConnected != true) {
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

		send.click(function () {
			var vvid = vid[0].node.value.trim();
			var vti = title[0].node.value.trim();
			var vde = description[0].node.value.trim();

			if (vid == "" || vti == "" || vde == "") {
				alert('Merci de remplir tous les champs')
				return false;
			}

			view.load.show('Nous publions cette vidéo ... ');

			callback({
				id: vvid,
				title: vti,
				description: vde
			});

		});

		vid[0].blur(function () {
			result.node.src = "https://www.youtube.com/embed/" + $(this).node.value;
		})


	}, publish_project: function (callback) {

		view.load.hide();

		if (user.isConnected != true) {
			$('.content').showError('Vous devez être connecté');
			return false;
		}

		var container = $(".content").child('div');

		var e = container.child('div').addClass('element');

		e.child('h2').html('Publier un projet.');

		e.child('p').html('Pour publier votre projet, vous devez le mettre en ligne sur une autre plateforme : ex GitHub(code) ou sur un cloud (Dropbox, Google Drive, OneDrive). Si vous avez créé un projet de type 3D, publiez les fichiers sur un cloud afin que tous puissent y accéder.');



		var vid = e.input('URL de partage ou URL de votre dépot git');

		e.child('p').html('Aperçu :')

		var result = e.child('iframe');
		result.css('height', "200px");
		result.css('width', "300px");

		var pxx = e.child('p').html('Faites une capture d\'écran de votre projet et mettez la en ligne avec ceci : ');
		var btn_upload = pxx.child('input');
		btn_upload.node.type = "file";


		var title = e.input('Nom du projet');
		var description = e.textarea('Description du projet');

		var send = e.child('button');
		send.addClass('btn');
		send.html('Publier');

		send.click(function () {
			var vvid = vid[0].node.value.trim();
			var vti = title[0].node.value.trim();
			var vde = description[0].node.value.trim();

			if (vid == "" || vti == "" || vde == "") {
				alert('Merci de remplir tous les champs')
				return false;
			}

			view.load.show('Publication de l\'image');

			/* image upload section */

			var file = btn_upload.node.files[0];
			if(file == null){
				alert('Erreur, vous devez uploader une capture');
				view.load.hide();
				return;
			}

			var data = new FormData();
			data.append("file", file);

			var a = new XMLHttpRequest();
			a.upload.addEventListener('progress', function (event) {
				view.load.hide();
				view.load.show(event.loaded + ' bytes loaded');
			}, false);
			a.addEventListener('load', function (event) {
				if (event.target.responseText == "ok") {
					view.load.hide();

					view.load.show('Publication de votre projet');

					callback({
						id: vvid,
						title: vti,
						description: vde,
						capture: "project_image_" + page.get('pid') + "." + file.name.split('.').reverse()[0]
					});
				}else{
					alert('Le serveur a retourné une erreur : ' + event.target.responseText);
					view.load.hide();
					
				}
			}, false);
			a.addEventListener('error', function () {

			}, false);
			a.addEventListener('abort', function () {

			}, false);

			a.open('POST', "api/index.php?res=img_upload&id=" + page.get('pid'));

			a.send(data);


			/* image upload section end */




		});

		vid[0].blur(function () {
			result.node.src = $(this).node.value;
		})


	}
	,
	publish_photos : function ( callback ) {
		view.load.hide();

		if (user.isConnected != true) {
			$('.content').showError('Vous devez être connecté');
			return false;
		}

		var container = $(".content").child('div');

		var e = container.child('div').addClass('element');

		e.child('h2').html('Publier un projet de type photo.');

		var pxx = e.child('p').html('Publiez la photo de couverture ici : ');
		var btn_upload = pxx.child('input');
		btn_upload.node.type = "file";
		pxx.child('span').html(' Vous pourrez uploader le reste des images via le paneau de getsion du projet.')


		var title = e.input('Nom du projet');
		var description = e.textarea('Description du projet');

		var send = e.child('button');
		send.addClass('btn');
		send.html('Publier');
		
		view.addInputAnimations();

		send.click(function () {
			var folder_title = title[0].node.value.trim();
			var folder_description = description[0].node.value.trim();

			if (folder_title == "" ||  folder_description == "") {
				alert('Merci de remplir tous les champs')
				return false;
			}

			view.load.show('Publication de l\'image');

			/* image upload section */

			var file = btn_upload.node.files[0];
			if(file == null){
				alert('Erreur, vous devez uploader une image');
				view.load.hide();
				return;
			}

			var data = new FormData();
			data.append("file", file);

			var a = new XMLHttpRequest();
			a.upload.addEventListener('progress', function (event) {
				view.load.hide();
				view.load.show(event.loaded + ' bytes loaded');
			}, false);
			a.addEventListener('load', function (event) {
				if (event.target.responseText == "ok") {
					view.load.hide();

					view.load.show('Publication de votre projet');

					callback({
						title: folder_title,
						description: folder_description,
						capture: "folder_" + page.get('pid') + "." + file.name.split('.').reverse()[0]
					});
					console.log(callback);
				}else{
					alert('Le serveur a retourné une erreur : ' + event.target.responseText);
					view.load.hide();
					
				}
			}, false);
			a.addEventListener('error', function () {

			}, false);
			a.addEventListener('abort', function () {

			}, false);

			a.open('POST', "api/index.php?res=img_upload&id=" + page.get('pid') + "&folder");

			a.send(data);


			/* image upload section end */




		});
	},

	/* ----------------------------------------------------------  /*
			View project page creation (as project manager)
	/* ----------------------------------------------------------- */
	createProjectAsManager: function (data) {
		view.load.hide();
		var container = $('.content').child("div");
		container.addClass('element');
		var result_messages = container.child('div');
		result_messages.node.id = "x_result_div";
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
			} else {
				var see_video = container.child('a');
				see_video.html('Afficher la vidéo');
				see_video.addClass('btn');

				see_video.click(function () {
					var full_screen_container = container.child('div');
					full_screen_container.addClass('fs_view');

					var btn_exit = full_screen_container.child('button').html("&#x2715;").addClass('fs_exit');

					btn_exit.click(function () {
						full_screen_container.removeClass('fs_view_visible');
						setTimeout(function () {
							full_screen_container.remove();
						}, 2000);
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
		} else if (data.type == "photo") {
			if (data.photo_folder == undefined) {
				var publish_folder = container.child('a');
				publish_folder.html('Publier les photos');
				publish_folder.addClass('btn');
				publish_folder.node.href = "#page=create_photo_folder;pid=" + page.get("pid");
			}else{
				var modify_or_upload = container.child('a');
				modify_or_upload.html('Gérer / uploader les photos');
				modify_or_upload.addClass('btn');
				modify_or_upload.node.href = "#page=photos_updater;pid=" + page.get("pid");
			}
		} else {
			if (data.other_folder == undefined) {
				var publish_project = container.child('a');
				publish_project.html('Publier le projet fini');
				publish_project.addClass('btn');
				publish_project.node.href = "#page=create_end_project;pid=" + page.get("pid");
			}
		}

		var manage_managers = container.child('button');
		manage_managers.html('Gérer les managers');
		manage_managers.addClass('btn');
		manage_managers.click(function () {

			var full_screen_container = container.child('div');
			full_screen_container.addClass('fs_view');

			var btn_exit = full_screen_container.child('button').html("&#x2715;").addClass('fs_exit');

			btn_exit.click(function () {
				full_screen_container.removeClass('fs_view_visible');
				setTimeout(function () {
					full_screen_container.remove();
				}, 2000);
			});

			full_screen_container.child('h2').html('Gestion des managers');
			full_screen_container.css('padding', "25px");
			var wait = full_screen_container.child('div').html('Chargement, merci de patienter.');
			model.getAllUsers(function (users) {

				wait.remove();
				var search = full_screen_container.input('Rechercher')[0];
				var users_by_id = {};
				for (var i = 0; i < users.length; i++) {
					var user = users[i];
					users_by_id[user.id] = user.mail;
				}
				var user_list = full_screen_container.child("div")

				for (var i = 0; i < data.managers.length; i++) {
					var element = data.managers[i];
					var user_div = user_list.child('div');
					user_div.child('span').html(users_by_id[element]);
					user_div.addClass('element');
				}

				search.node.onkeyup = function () {
					user_list.html('');
					for (var i = 0; i < users.length; i++) {
						var user = users[i];
						if (user.mail.replace("@indse.be", "").indexOf(search.node.value) >= 0) {
							var user_div = user_list.child('div');
							user_div.child('span').html(user.mail);
							user_div.addClass('element');
							user_div.css('position', "relative");
							if (data.managers.indexOf(user.id) >= 0) {
								var already_manager = user_div.child('span').html("Cette personne fait partie du projet");
								already_manager.css('position', 'absolute');
								already_manager.css('top', '50%');
								already_manager.css('right', '15px');
								already_manager.css('transform', 'translateY(-50%)');
							} else {
								if (user.mail.indexOf('indse.be') < 0) {
									var wrong_email_adress = user_div.child('span').html("Action impossible");
									wrong_email_adress.css('position', 'absolute');
									wrong_email_adress.css('top', '50%');
									wrong_email_adress.css('right', '15px');
									wrong_email_adress.css('transform', 'translateY(-50%)');
								} else {
									var add_user_to_managers_list = user_div.child('button').html("Ajouter au projet").addClass('btn');
									add_user_to_managers_list.css('position', 'absolute');
									add_user_to_managers_list.css('top', '50%');
									add_user_to_managers_list.css('right', '5px');
									add_user_to_managers_list.css('transform', 'translateY(-50%)');
									add_user_to_managers_list.node.setAttribute('data-id', user.id);
									add_user_to_managers_list.click(function () {
										full_screen_container.css('display', "none");
										view.load.show('Nous tentons d\'ajouter cette personne au projet');
										model.addManagerTo(data.id, this.getAttribute("data-id"));
									});
								}
							}
						}
					}
				}

				full_screen_container.addClass('fs_view_visible');
			});


		});


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
	/* ----------------------------------------------------------  /*
			View project page creation (as simple user)
	/* ----------------------------------------------------------- */
	createProjectAsVisitor: function (data) {
		view.load.hide();
		if (data == "UError") {
			$('.content').html('<div class="error">Erreur : utilisateur non connecté ou ne participant pas au projet</div>');
			return false;
		}

		var container = $('.content').child("div");
		container.addClass('element');

		var image_and_title = container.child('div');
		image_and_title.createImage(data.name);

		if (data.type == "video") {
			if (data.video != undefined) {
				var see_video = container.child('a');
				container.child('br');
				container.child('br');
				see_video.html('Afficher la vidéo');
				see_video.addClass('btn');

				see_video.click(function () {
					var full_screen_container = container.child('div');
					full_screen_container.addClass('fs_view');

					var btn_exit = full_screen_container.child('button').html("&#x2715;").addClass('fs_exit');

					btn_exit.click(function () {
						full_screen_container.removeClass('fs_view_visible');
						setTimeout(function () {
							full_screen_container.remove();
						}, 2000);
					});

					var iframe = full_screen_container.child('iframe');
					iframe.node.src = data.video.url;
					iframe.node.setAttribute('allowfullscreen', "");

					full_screen_container.addClass('fs_view_visible');

				});
			}
		}

		var project_type = container.child("span");
		project_type.html('Type de projet :' + data.type);

		container.child("br"); // On ne le conserve pas dans une variable

		var project_progression = container.child("span");
		project_progression.html('Progression :' + data.progression + " %");

		var project_description = container.child("p");
		project_description.html('Description: ' + data.description);
	},

	createPhotosFoldersList: function (data) {

		var container = $('.content');

		for (var i = 0; i < data.length; i++) {
			var element = data[i];

			var folder = container.child('div').addClass('img_folder');
				folder.css('display', "inline-block");

			var img = folder.child('div').addClass('img');
			img.css('background', "url(resources/images/" + element.cover + ") no-repeat");
			img.css('background-position', "center");
			img.css('background-size', "cover");

			var text_area = folder.child('div').addClass('text-area');

			text_area.child('span').html(element.title).addClass('title');

			text_area.child('div').html(element.description.substr(0, 300)).addClass('description');

			var btn_containers = folder.child('div');
			btn_containers.addClass("btn_container");

			/*var open = btn_containers.child("a");
			open.addClass('btn2')
			open.html('Afficher les images');
			open.node.href = "#page=view_folder;folder_id=" + element.id;*/

			var see_full_description = btn_containers.child("a");
			see_full_description.addClass('btn2')
			see_full_description.html('Description complète');
			see_full_description.node.setAttribute("id", i);
			see_full_description.click(function () { 
				alert(data[$(this).node.getAttribute("id")].description);
			});

		}
	},
	/* ----------------------------------------------------------  /*
							menu creation
	/* ----------------------------------------------------------- */
	createHamburgerAndMenu: function () {
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

	/* ----------------------------------------------------------  /*
						Links addition
	/* ----------------------------------------------------------- */

	addContentToMenu: function () {
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

		} else {
			menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;">account_circle</i></span><a href="#page=login">Me connecter</a></div>');
		}

		menu_app.html(menu_app.html() + '<div class="button"><span><i class="material-icons" style="font-size:inherit;"></i></span>vicri.esy.es</div>');


	}


	,

	/* ----------------------------------------------------------  /*
						Loader system creation
	/* ----------------------------------------------------------- */

	load: {
		element: null,
		mask: null,
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
				var id = Math.random();
				this.id = id;
				this.loader = text;

				loader.appendChild(e);
				loader.appendChild(e2);
				loader.appendChild(e3);
				loader.appendChild(br);
				loader.appendChild(text);
				document.body.appendChild(hide);

				document.body.appendChild(loader);
				this.active = true;
				setTimeout(function () {
					if (view.load.active == true && view.load.id == id) {
						$(view.load.loader).html('Une erreur est survenue');
						hide.style.background = "rgba(150, 0, 0, 0.95)";
						setTimeout(function () {

							if (view.load.active == true && view.load.id == id) {
								$(view.load.loader).html('Une erreur est survenue, annulation de l\'opération en cours. Nous allons recharger la page.');
							}

							setTimeout(function () {
								if (view.load.active == true && view.load.id == id) {
									view.load.hide();
									window.location.reload();
								}
							}, 8000);

						}, 5000);
					}
				}, 10000);
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

ExtJsPlugIn.createImage = function (text) {
	var img = document.createElement("img");
	img.src = "https://api.fnkr.net/testimg/" + Math.floor(this.node.offsetWidth) + "x200/ffffff/a1a1a1/?text=" + text;
	img.style.width = "100%";
	this.node.appendChild(img);
	return img;
}

ExtJsPlugIn.showError = function (text) {
	this.html('<div class="error">' + text + '</div>' + this.html());
}

ExtJsPlugIn.input = function (text, value, type) {
	var element = this.child("div");
	element.addClass('field');

	var element_text = element.child('label');
	element_text.html(text);
	element_text.addClass('top');

	var element_input = element.child("input");
	element_input.addClass('input');
	if (value != undefined) {
		element_input.node.value = value;
	}
	if (type != undefined) {
		element_input.node.type = type;
	}

	view.addInputAnimations();

	element_input.node.focus();
	element_input.node.blur();

	return [element_input, element];
}

ExtJsPlugIn.textarea = function (text, value) {
	var element = this.child("div");
	element.addClass('field');

	var element_text = element.child('label');
	element_text.html(text);
	element_text.addClass('top');

	var element_input = element.child("textarea");
	element_input.addClass('input');
	if (value != undefined) {
		element_input.node.value = value;
	}

	view.addInputAnimations();

	element_input.node.focus();
	element_input.node.blur();

	return [element_input, element];
}


ExtJsPlugIn.selectMinMax = function (text, min, max) {
	var element = this.child("div");
	element.addClass('field').addClass('notempty').addClass('ib-80');

	var element_text = element.child('label');
	element_text.html(text);
	element_text.addClass('top');

	var element_input = element.child("select");

	var select = element_input.node;

	for (var i = min; i <= max; i++) {
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

ExtJsPlugIn.selectArray = function (text, array, texts) {
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

view.newPopup = function (text, type, callback, abort) {

	var mask = $('body').child('div');
	mask.css('position', "fixed");
	mask.css('z-index', "99");
	mask.css('top', "0");
	mask.css('left', "0");
	mask.css("right", "0");
	mask.css('bottom', "0");
	mask.css("background", "rgba(0,0,0,0.15)");

	var popup = $("body").child('div');
	popup.addClass('element')
	popup.css('position', "fixed");
	popup.css('z-index', "100");
	popup.css('top', "50%");
	popup.css('left', "50%");
	popup.css('width', "300px");
	popup.css('height', "110px");
	popup.css('transform', "translateX(-50%) translateY(-50%)");

	mask.click(function () {
		mask.remove();
		popup.remove();
		abort();
	});

	var input = popup.input(text, "", type)[0];

	input.node.focus();

	var submit = popup.child('button');

	submit.addClass('btn');

	submit.html('Continuer');

	submit.css('position', "absolute");

	submit.css("right", "5px");
	submit.css('bottom', "10px");

	submit.click(function () {
		mask.remove();
		popup.remove();
		callback(input.node.value);
	});

}
