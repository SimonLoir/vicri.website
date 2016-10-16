<script src="js/extjs.js"></script>
<?php 

session_start();

if (isset($_SESSION["__admin"])) {
	echo '<script>var app = "ok";</script>';


}else{
	echo '<script>var app = "log";</script>';
	echo '
	<form method="post" id="login">
		Pour continuer, introduisez la clé "admin"
		<input type="text" placeholder="Clé admin" id="key">
		<input type="submit">
	</form>
	';

}

?>

<script>
	if (app == "log") {
		var form = document.querySelector("#login");

		form.onsubmit = function (){
			var key = document.querySelector("#key").value;

			AR.POST('api?res=uconnect', {key:key}, function (data){
				if (data == "__Ok") {
					return;
				}
			})
			return false;
		}
	}


</script>
