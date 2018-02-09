<?php session_start(); ?>

<?php 

if (isset($_GET['logout'])) {

    session_destroy();

    header('Location: admin.php');

}

?>

<!DOCTYPE html>

<html lang="en">

<head>

	<meta charset="UTF-8">

	<title>Admin panel</title>

</head>

<body>

<h1>Admin panel</h1>

	<?php if (isset($_SESSION["id"]) && ($_SESSION["id"] == 1 || $_SESSION["id"] == 2)) : ?>

		<div class="element">

			<form method="POST" action="api/index.php?res=admin::newuser">

				<div class="field">

       				<label class="top">name</label>

       				<input type="text" name="name" class="input">

   				</div>

				<div class="field">

       				<label class="top">firstname</label>

       				<input type="text" name="firstname" class="input">

   				</div>

   				<div class="field">

       				<label class="top">email</label>

       				<input type="text" name="email" class="input">

   				</div>

   				<div class="field">

       				<label class="top">pseudo</label>

       				<input type="text" name="pseudo" class="input">

   				</div>

   				<div class="field">

       				<label class="top">password</label>

       				<input type="password" name="password" class="input">

   				</div>

				

				<input type="submit" value="Ok" class='btn'>

			</form>

		</div>

	<?php endif ?>

</body>

</html>



<script>

	

	

		var all = document.querySelectorAll(".input");

    	for (var i = 0; i < all.length; i++) {

    	    

    	    all[i].onfocus = function () {

    	        this.parentElement.classList.add('focus');

    	        if(this.parentElement.classList.contains("notempty")){

    	            this.parentElement.classList.remove('notempty');

    	        }

    	    }



    	    all[i].onblur = function(){

    	        this.parentElement.classList.remove('focus');

    	        if(this.value != ""){

    	           this.parentElement.classList.add('notempty');

    	        }

    	    }

    	}



</script>