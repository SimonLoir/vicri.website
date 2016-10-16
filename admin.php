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
	<?php if (!isset($_SESSION["admin"])): ?>
		<?php 
		if (isset($_POST['submit']) && isset($_POST['key'])) {
			if ($_POST['key'] == "v1crI2015-2016-KEY") {
				$_SESSION['admin'] = "indse";
				header('Location: admin.php');
			}else{
				echo "Erreur de clé d'accès";
			}
		}
		 ?>
		<form action="" method="post">
			<input type="password" name="key">
			<input type="submit" name="submit">
		</form>
	<?php endif ?>
	<?php if (isset($_SESSION["admin"])): ?>
		<form method="POST" action="api/index.php?res=admin::newuser">
			<input type="text" name="name" placeholder="name"><br />
			<input type="text" name="firstname" placeholder="firstname"><br />
			<input type="text" name="email" placeholder="email"><br />
			<input type="text" name="pseudo" placeholder="pseudo"><br />
			<input type="password" name="password" placeholder="password">
			
			<input type="submit" value="Ok">
		</form>
	<?php endif ?>
</body>
</html>
