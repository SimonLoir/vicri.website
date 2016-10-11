/* Une page */
var page = {
	url : window.location.href,
	target : "home",
	informations : "",
	getInformations : function (){ // récupère l'information après le #
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
	}
}