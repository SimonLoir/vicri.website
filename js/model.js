/* Une page */
var page = {
	url: window.location.href,
	target: "home",
	informations: "",
	/**
	 * Get informations form the page url.
	 */
	getInformations: function () {
		this.url = window.location.href;

		var pageInformations = this.url.split('#')[1];

		if (pageInformations != undefined) {
			this.informations = pageInformations;
		}
	},
	/**
	 * Get the page name
	 * @return {String} home or page name
	 */
	getTarget: function () {
		this.getInformations();
		if (this.informations != "") {
			var pagesInformationsArray = this.informations.split(';');
			for (var i = 0; i < pagesInformationsArray.length; i++) {
				var info = pagesInformationsArray[i].split('=');
				if (info[0] == "page") {
					this.target = info[1];
					return info[1];
				}
			}
		}
		this.target = "home";
		return this.target;
	},
	/**
	 * @param {String} query the query string part that we have to find (in window.location.hash)
	 * @return {Boolean|String} false or the value of the query string part
	 */
	get: function (query) {
		this.getInformations();
		if (this.informations != "") {
			var pagesInformationsArray = this.informations.split(';');
			for (var i = 0; i < pagesInformationsArray.length; i++) {
				var info = pagesInformationsArray[i].split('=');
				if (info[0] == query) {
					this.target = info[1];
					return info[1];
				}
			}
			return false;
		} else {
			return false;
		}
	}
}

var model = {
	/**
	 * Get all the videos and their informations
	 * @param {model~getVideosCallback} 
	 */
	getAllVideos: function (callback) {
		AR.GET('api?res=videos', function (data) {
			$('.content').clear();
			try {
				callback(JSON.parse(data));
			} catch (error) {
				$('.content').html(error.message);
			}
		});
	},
	/*
	PRE : /
	POST :
		+ data
		=> callback(data)
	*/
	getAllProjects: function (callback) {
		AR.GET('api?res=projects', function (data) {
			$('.content').clear();
			try {
				callback(JSON.parse(data));
			} catch (error) {
				$('.content').html(error.message);
			}
		});
	},
	getAllPhotosFolders: function (callback) {
		AR.GET('api?res=photos_folders', function (data) {
			view.load.hide();
			$('.content').clear();
			//alert(data)
			try {
				callback(JSON.parse(data));
			} catch (error) {
				$('.content').html(error.message);
			}
		});
	},
	/*
	PRE : /
	POST :
		+ pdata
		=> callback(pdata)
	*/
	getProject(callback_manager, callback, dont_user_br) {
		AR.GET('api?res=project&id=' + page.get('pid') + "&manager=" + page.get("manager") + "&mod=" + dont_user_br, function (data) {

			var pdata = JSON.parse(data);

			// On doit faire une vérification

			if (page.get("manager") == "true" && pdata != "UError") {


				callback_manager(pdata);

				// Pas besoin de vérification : l'utilisateur n'aura pas le droit de modifier le projet.

			} else {

				callback(pdata);

			}

		});
	},
	login: function (email, password) {

		AR.POST('api/index.php?res=login', { email: email, password: password }, function (data) {
			if (JSON.parse(data) == "ok") {
				user.liState(true);
				window.location.hash = "page=home;action=welcome";
			} else {
				alert('Une erreur est survenue');
			}
		});

	}, getFolderByID: function (callback) {
		AR.GET('api?res=img_folder&id=' + page.get('folder_id'), function (data) {
			view.load.hide();
			$('.content').clear();
			try {
				callback(JSON.parse(data));
			} catch (error) {
				$('.content').html(error.message);
			}
		});
	},
	loginWithGoogle: function (token) {

		AR.POST('api/googleLogin.php', { token: token }, function (data) {
			$('.content').html(decodeURIComponent(data))
			if (JSON.parse(data) == "ok") {

				window.location.hash = "page=projets";

				alert('Bienvenue !');
			} else {
				alert('Une erreur est survenue');
			}
		});

	}, newProject: function (project_name, project_short_description) {

		if (project_short_description.length > 200) {
			alert('Votre description est trop longue. Le maximum autorisé est de 200 \n taille actuelle : ' + project_short_description.length);
			return false;
		}
		if (project_short_description == "" || project_name == "") {
			alert('Merci de remplir tous les champs');
			return false;
		}
		if (project_short_description.length < 10) {
			alert('Votre description est trop courte ! Votre description courte doit comporter entre 10 et 200 caractères');
			return false;
		}
		AR.POST('api/index.php?res=new_project', {

			name: project_name, desc: project_short_description

		}, function (data) {

			if (JSON.parse(data) == "Ok") {
				window.location.hash = "page=projets";
			}

		}, function () {
			alert("Une erreur est survenue, réessayez ultérieurement");
		});


	}, getCalendar: function (callback) {

		var d = new Date();

		var weekday = new Array(7);
		weekday[0] = "dimanche";
		weekday[1] = "lundi";
		weekday[2] = "mardi";
		weekday[3] = "mercredi";
		weekday[4] = "jeudi";
		weekday[5] = "vendredi";
		weekday[6] = "samedi";

		var month = new Array();
		month[0] = "Janvier";
		month[1] = "Février";
		month[2] = "Mars";
		month[3] = "Avril";
		month[4] = "Mai";
		month[5] = "Juin";
		month[6] = "Juillet";
		month[7] = "Août";
		month[8] = "Septembre";
		month[9] = "Octobre";
		month[10] = "Novembre";
		month[11] = "Décembre";

		var n = weekday[d.getDay()];
		var m = month[d.getMonth()];

		var today = {
			dayName: n,
			day: d.getDate(),
			monthName: m,
			month: d.getMonth()
		};

		AR.GET('api/index.php?res=calendar', function (data) {

			callback(JSON.parse(data), today, weekday, month);

		});



	}, newEvent: function (date, title, desc) {
		AR.POST('api/index.php?res=new_event', {

			date: date, title: title, desc: desc

		}, function (data) {
			if (JSON.parse(data) == "ok") {

				window.location.hash = "page=calendar;action=created_event"

			} else {

				alert('Erreur : le serveur ne peut pas ajouter cet event pour le moment')

			}
		});

	},
	updateProject: function (input, short_description, description, progression, goals, links, type, pid) {
		AR.PUT('api/index.php?res=project&manager=' + page.get('manager'), { name: input, short_description: short_description, description: description, progression: progression, goals: goals, links: links, type: type, id: pid }, function (data) {
			var x_response = JSON.parse(data);
			view.load.hide();
			$("#x_result_div").html("");
			if (x_response == "Ok") {
				view.showConfirmationMessage('Les modifications ont été appliquées <a href="#page=project;pid=' + pid + ';manager=true">Voir le projet</a>', $("#x_result_div"));
			} else {
				$("#x_result_div").showError(x_response);
			}
		});
	}, publish_video: function (d) {
		AR.POST('api/index.php?res=publish_video&pid=' + page.get('pid') + '&manager=true', d, function (data) {
			view.load.hide();
			try {
				var server_response = JSON.parse(data);

				if (server_response == "ok") {
					window.location.href = "#page=project;manager=true;pid=" + page.get('pid');
				} else {
					alert('Une erreur est survenue du côté du serveur');
				}

			} catch (error) {
				alert('Une erreur inconnue est survenue' + error + "\n" + data);
			}
			//
		});
	}, delete_video: function (vid) {
		AR.DELETE("api/index.php?res=video&vid=" + vid, function (data) {

			try {
				var response = JSON.parse(data);

				if (response == "ok") {
					window.location.reload();
				} else {
					alert('Une erreur est survenue au niveau du serveur');
				}
			} catch (error) {
				alert("Erreur inconnue : \n" + error);
			}

		});
	}, getAllUsers: function (callback) {

		AR.GET('api/index.php?res=users', function (data) {
			try {
				var response = JSON.parse(data);
				callback(response);
			} catch (error) {
				alert("Erreur inconnue : \n" + error);
			}
		}, function () {
			alert('Une erreur est survenue');
		})

	}, addManagerTo: function (pid, mid) {
		AR.PUT("api/index.php?res=managers&manager=true", { pid: pid, mid: mid }, function (data) {
			if (data == "Ok") {
				view.showConfirmationMessage('Ok', $("#x_result_div"));
				view.load.hide();
				window.location.reload(true);
			} else {
				alert('Erreur:' + data);
			}
		}, function () {
			alert('Une erreur est survenue. ');
		});
	}
}

var user = {
	/*	
		Note : user (this) can be used outside model.js
		PRE : /
		POST : 
			user.isConnected = true if user is connected
							 = false if not 
			if user is connected :
				user.pseudo defined or updated 
				user.mail defined or updated 
				user.name defined or updated 
				user.firstname defined or updated 
				user.liState_ver_date defined or updated 

	*/
	liState: function (reload, callback) {
		var date = new Date();

		var date_now = date.getTime();

		var page_target = page.getTarget();

		if (reload != true) {
			switch (page_target) {
				case "modify_project":
					break;
				case "account":
					break;
				case "new_project":
					break;
				case "new_event":
					break;
				case "upload_video":
					break;
				default:
					if (this.liState_ver_date != undefined) {

						if (this.liState_ver_date - date_now < 30000) {

							if (callback != undefined) {
								callback();
							} else {
								controller.doWork();
							}

							return false;
						}
					}
			}
		}

		AR.GET('api?res=user_connection_state', function (data) {
			if (data == "Empty") {

				user.isConnected = false;

			} else if (data != "") {

				user.isConnected = true;

				try {

					var d = JSON.parse(data)[0];

					user.pseudo = d.pseudo;
					user.mail = d.mail;
					user.name = d.name;
					user.firstname = d.firstname;
					user.liState_ver_date = date.getTime();

				} catch (e) {
					console.log(e);
				}
			}

			if (callback != undefined) {
				callback();
			} else {
				controller.doWork();
			}
		});
	}

}
