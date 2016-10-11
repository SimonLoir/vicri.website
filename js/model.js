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
			
		}
	}
}