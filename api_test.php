<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="js/extjs.js"></script>
</head>
<body>
	

</body>
<script>
ExtJsPlugIn.htm = function (html) {
	this.html(this.html() +"<br />" +  html);
}

ExtJsPlugIn.undefined = function (res) {
	let html = "<p><b style=\"color:crimson;\"> => Alert : </b> " + res + " is undefined</p>"
	this.html(this.html() +  html);
}
		AR.GET('api?res=projects', function (string) {
			var test = $("body").child('div');
			try {
    			var data = JSON.parse(string);
    			var error = false;

    			test.html('<h2>?res=projects<h2>');

    			if (data[0] == undefined) {
    				test.undefined("data[0]")
    			}else{
    				test.htm("Ok : data[0] is defined => " + JSON.stringify(data[0]));
    			}

    			var x = data[0];

    			if (x.id == undefined) {
    				test.undefined("data[0].id");error = true;
    			}else{
    				test.htm("Ok : data[0].id is defined => " + JSON.stringify(data[0].id));
    			}

    			if (x.progression == undefined) {
    				test.undefined("data[0].progression");error = true;
    			}else{
    				test.htm("Ok : data[0].progression is defined => " + JSON.stringify(data[0].progression));
    			}

    			if (x.pined == undefined) {
    				test.undefined("data[0].pined");error = true;
    			}else{
    				test.htm("Ok : data[0].pined is defined => " + JSON.stringify(data[0].pined));
    			}

    			if (x.managers == undefined) {
    				test.undefined("data[0].managers");error = true;
    			}else{
    				test.htm("Ok : data[0].managers is defined => " + JSON.stringify(data[0].managers));
    			}

    			if (x.user_is_manager == undefined) {
    				test.undefined("data[0].user_is_manager");error = true;
    			}else{
    				test.htm("Ok : data[0].user_is_manager is defined => " + JSON.stringify(data[0].user_is_manager));
    				if (typeof(data[0].user_is_manager) == "boolean") {
    					test.htm("           => Ok : typeof -> data[0].user_is_manager => boolean");
    				}else{
    					test.htm("           => Alert : typeof -> data[0].user_is_manager => <b>!= boolean</b>");
    				}
    			}

    			if (x.name == undefined) {
    				test.undefined("data[0].name");error = true;
    			}else{
    				test.htm("Ok : data[0].name is defined => " + JSON.stringify(data[0].name));
    			}



    			if (error == true) {
    				test.htm('<b style="color:crimson;">{<br />=>  An error occurred  <=<br />}</b><hr />')
    			}else{
    				test.htm('<b style="color:green;">{<br />=>  OK (0 error)  <=<br />}</b><hr />')
    			}

			}catch(err) {
    			test.html('error')
			}
		});


</script>
</html>
