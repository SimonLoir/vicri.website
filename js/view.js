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

			var open = e.child("a");
			if (project.user_is_manager == true) {
				open.html("Gérer");
				open.node.href = "#page=project;pid=" + project.id + ';manager=true';
			}else{
				open.html("Ouvir");
				open.node.href = "#page=project;pid=" + project.id + ';manager=false';
			}
		}
	},
	createVideoList : function(data){
		var container = $(".content").child('div');
		for (var i = 0; i < data.length; i++) {
			var video = data[i];

			var video_container = container.child("div");
			video_container.node.style.display = "inline-block";

			var iframe  = video_container.child("iframe");
			iframe.node.src = video.url;
			iframe.node.style.display = "block";
			iframe.node.style.width = "400px";
			iframe.node.style.height = "225px";

			var open = video_container.child("a");
			open.node.href = "#page=project;pid=" + video.id + ';manager=false';
			open.html('Accèder au projet');
		}
	}

}