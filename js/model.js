/* Une page */
var page = {
	url : window.location.href,
	target : "home",
	informations : "",
	getInformations : function (){ // récupère l'information après le #
		this.url = window.location.href;

		var pageInformations = this.url.split('#')[1];
		
		if (pageInformations != undefined) {
			this.informations = pageInformations;
		}
	},
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

var model = {
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
	getProject(callback_manager, callback){
		AR.GET('api?res=project&id='  + page.get('pid') + "&manager=" + page.get("manager"), function (data){
			
			var pdata = JSON.parse(data);

			// On doit faire une vérification

			if (page.get("manager") == "true" && pdata != "UError") {
				
				
				callback_manager(pdata);

			// Pas besoin de vérification : l'utilisateur n'aura pas le droit de modifier le projet.

			}else{
				
				callback(pdata);

			}

		});
	}
}