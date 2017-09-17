<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="js/extjs.js"></script>
	<style>
	b{
		color:red;
	}	
	body{
		font-family: sans-serif;
	}
	</style>
</head>
<body>
	<div class="logs">

	</div>
</body>
<script>

	try_api('api?res=projects', "GET", {
		for:0,
		try: [
			"id", "name", "managers", "progression", "pined", "shortDescription", "user_is_manager"
		]
	});

	try_api('api?res=project&id=1', "GET", {
		try: [
			"error", "id", "name", "managers","type", "progression", "pined", "description","shortDescription", "goals", "links"
		]
	});

	try_api('api?res=videos', "GET", {
		for: 0 ,
		try: [
			"id", "url", "provider", "title",  "description" 
		]
	});

	function try_api( url , method , options, xhttp_otions) {
		if(xhttp_otions == undefined){
			AR[method]( url , function(data) {
				result(data, options, url);
			});
		}else{
			AR[method]( url , xhttp_otions ,  function(data) {
				result(data, options, url);
			});			
		}
	}

	function echo (text){
		$('.logs').html($('.logs').html() + text + '<br />');
	}

	function result ( data , options , url) {

			echo ( "For " + url );
			

			var data = JSON.parse(data);

			if( options != undefined ){
				
				if( options.for != undefined ){

					try {
						data = data[options.for];
					} catch (error) {
						echo ( "<b>Options error : index" + options.for + " is undefined in api response</b>" );
					}

				}

				for (var i = 0; i < options.try.length; i++) {

					var e = options.try[i];

					if( data[e] != undefined ){

						echo ( "<i>Index " + e + " is defined : " + data[e] + "</i>");

					}else{
						echo ( "<b>Fatal error : index " + e +  " is undefined</b>" );
					}
				}

				if(options.try.length == Object.keys(data).length){
					echo ( "<i>length : ok</i>" );
				}else{
					echo ( "<b>error : elements missing, you can ignore this warning if api call is equal to project</b>" );
					echo ( JSON.stringify(Object.keys(data)) + " != " + JSON.stringify(options.try) );
				}

			}else{
				echo ("<b>" + url + " can't try : try_api options are undefined" + "</b>");
			}
		echo ('');
		echo ('');
	}
</script>
</html>
