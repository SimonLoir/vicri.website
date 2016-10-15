var view = {
	createTitle : function (text){
		var e = $(".content").child("h2");
		e.html(text);
	}
	,
	createProjectList : function (project_list) {
		var container = $(".content").child('div');

		for (var i = 0; i < project_list.length; i++) {
			var project = project_list[i];

			var e = container.child('div');

			var title = e.child('span');
			title.html(project.name + " (" + project.progression + "%)");

			var description = e.child('p');
			description.html(project.shortDescription);
		}
	}

}