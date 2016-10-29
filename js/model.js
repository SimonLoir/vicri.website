/* Une page */
var page = {
	url : window.location.href,
	target : "home",
	informations : "",
	/*
	Pré : window.location.href
	Post :
		+ this.informations
	*/
	getInformations : function (){ // récupère l'information après le #
		this.url = window.location.href;

		var pageInformations = this.url.split('#')[1];
		
		if (pageInformations != undefined) {
			this.informations = pageInformations;
		}
	},
	/*
	Pré : 
		this.getInformations => this.informations
	Post : 
		this.target
	*/
	getTarget : function () {
		this.getInformations();
		if (this.informations != "") {
			var pagesInformationsArray = this.informations.split(';');
			for (var i = 0; i < pagesInformationsArray.length; i++) {
				var info = pagesInformationsArray[i].split('=');
				if(info[0] == "page"){
					this.target = info[1];
					return info[1];
				}
			}
		}
		this.target = "home";
		return this.target;
	},
	/*
	Pré : query != empty
	Post :  
		false || information
	*/
	get : function (query){
		this.getInformations();
		if (this.informations != "") {
			var pagesInformationsArray = this.informations.split(';');
			for (var i = 0; i < pagesInformationsArray.length; i++) {
				var info = pagesInformationsArray[i].split('=');
				if(info[0] == query){
					this.target = info[1];
					return info[1];
				}
			}
			return false;
		}else{
			return false;
		}
	}
}

var objectStorage = {

}

var model = {
	/*
	PRE : /
	POST : 
		+ data
		=> callback(data)
	*/
	getAllVideos : function (callback) {
		AR.GET('api?res=videos', function(data){
			$('.content').clear();
			try{
				callback(JSON.parse(data));
			}catch(error){
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
	getAllProjects : function (callback){
		AR.GET('api?res=projects', function(data){
			$('.content').clear();
			try{
				callback(JSON.parse(data));
			}catch(error){
				$('.content').html(error.message);
			}
		});
	},
	/*
	PRE : /
	POST : 
		+ pdata
		=> objectStorage.data = pdata
		=> callback(pdata)
	*/
	getProject(callback_manager, callback){
		AR.GET('api?res=project&id='  + page.get('pid') + "&manager=" + page.get("manager"), function (data){
			
			var pdata = JSON.parse(data);

			objectStorage.data = pdata;

			// On doit faire une vérification

			if (page.get("manager") == "true" && pdata != "UError") {
				
				
				callback_manager(pdata);

			// Pas besoin de vérification : l'utilisateur n'aura pas le droit de modifier le projet.

			}else{
				
				callback(pdata);

			}

		});
	},
	login : function ( email, password) {

		AR.POST('api/index.php?res=login', {email: email, password: password}, function (data){
			if (JSON.parse(data) == "ok") {
				
				window.location.hash = "page=projets";
				
				alert('Bienvenue !');
			}else{
				alert('Une erreur est survenue');
			}
		});

	},
	loginWithGoogle : function (token) {

		AR.POST('api/googleLogin.php', {token: token}, function (data){
			$('.content').html(decodeURIComponent(data))
			if (JSON.parse(data) == "ok") {
				
				window.location.hash = "page=projets";
				
				alert('Bienvenue !');
			}else{
				alert('Une erreur est survenue');
			}
		});

	}
}

var user = {
	/*
	PRE : /
	POST : 
		+ user.isConnected
		#Si user.isConnected = false
		+ user.pseudo
		+ user.mail
		+ user.name 
		+ user.firstnames

		=> controller.js : doWork()
	*/
	liState : function (){
		AR.GET('api?res=user_connection_state', function (data) {
			if (data == "Empty") {

				user.isConnected = false;

			}else if (data != ""){

				user.isConnected = true;

				try {
					
					var d = JSON.parse(data);
					user.pseudo = d.pseudo;
					user.mail = d.mail;
					user.name = d.name;
					user.firstname = d.firstname;

				} catch(e) {
					console.log(e);
				}
			}
			doWork()
		});
	}
	
}
