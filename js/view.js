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
			title.html(project.name);

			var progress = e.child("span");
			var progress__style = progress.node.style;
            progress__style.display = "inline-block";
            progress.html(project.progression + "%");
            
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

			var open = e.child("button");

			if (project.user_is_manager == true) {
				open.html("Gérer");
			}else{
				open.html("Ouvir");
			}
		}
	}

}