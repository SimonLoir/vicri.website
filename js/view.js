var view = {

	/*
	Pre : text != undefined
	*/
	createTitle : function (text){
		var e = $(".content").child("h2");
		e.html(text);
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
		var container = $(".content").child('div');

		/*
		Pour tous les projets de la liste de projets
		*/

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
	/*
	Pré :
		data (array)
		[{id (int) ,url (string) ,provider (string) ,title (string) ,description (string)} , {video}] 
	Post : 
		Dom elements, HTML
	*/
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
	},

	/*
	Pré :
		data (array) 
		{id (int) ,name (string) ,managers (array) ,type (string) ,progression (int) ,pined (int) ,description (string) ,shortDescription (string) ,goals (string) ,links (string)} 
	Post : 
		Dom elements, HTML
	*/

	createProjectAsManager : function(data){
		$('.content').createImage(data.name);
		
		var project_type = $('.content').child("span");
		project_type.html('Type de projet :' + data.type);
		project_type.node.view_element_type = "type";

		$('.content').child("br"); // On ne le conserve pas dans une variable 

		var project_progression = $('.content').child("span");
		project_progression.html('Progression :' + data.progression + " %");
		project_progression.node.view_element_type = "progression";

		var project_short_description = $('.content').child("p");
		project_short_description.html('Description courte : ' + data.shortDescription);
		project_short_description.node.view_element_type = "sdescription";

		var project_description = $('.content').child("p");
		project_description.html('Description: ' + data.description);
		project_description.node.view_element_type = "description";

		var elements = [project_type, project_progression, project_short_description, project_description]

		console.log(elements);

		for (var i = 0; i < elements.length; i++) {
			var btn = elements[i].child('button');
			btn.html('éditer');
			btn.addClass("edit");
			btn.click(function (){
				controller.onProjectEditButtonClick($(this));
			});
		}

	},
	/*
	Pré :
		data (array) 
		{id (int) ,name (string) ,managers (array) ,type (string) ,progression (int) ,pined (int) ,description (string) ,shortDescription (string) ,goals (string) ,links (string)} 
	Post : 
		Dom elements, HTML
	*/
	createProjectAsVisitor : function(data){
		if (data == "UError") {
			$('.content').html('Erreur : utilisateur non connecté ou ne participant pas au projet')
		}else{
			$('.content').createImage(data.name);
		}

		var project_type = $('.content').child("span");
		project_type.html('Type de projet :' + data.type);

		$('.content').child("br"); // On ne le conserve pas dans une variable 

		var project_progression = $('.content').child("span");
		project_progression.html('Progression :' + data.progression + " %");

		var project_description = $('.content').child("p");
		project_description.html('Description: ' + data.description);
	}
}

// Petite méthode qui est utilisée dans model.createProjectAsVisitor() voir $('.content').createImage(data.name);

ExtJsPlugIn.createImage = function (text){
	var img = document.createElement("img");
	img.src = "https://api.fnkr.net/testimg/1600x300/ffba6f/fff/?text=" + text;
	img.style.width = "100%";
	this.node.appendChild(img);
	return img;
}