<?php
session_start();
$_SESSION['user_id'] = 1;

//On récupère la méthode
if (isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
	$method = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'];
}else{
	$method = $_SERVER['REQUEST_METHOD'];
}


if (!isset($_GET['res']) || empty($_GET['res']) ) {
	$res = "docu";
}else{
	$res = $_GET['res'];
}

/* --- --- --- --- --- --- --- --- --- --- */
/*  => */include "../../config.php"; /* <= */
/* --- --- --- --- --- --- --- --- --- --- */

include 'Class/autoloader.php';

spl_autoload_register(["autoloader", "load"]);


$db = new db('u223506911_base',$db__user , $db__pass, $db__host);

if ($method == "GET") {
	if ($res == "projects") { 

		$result = [];

		$projects = $db->query('SELECT id, name, managers, shortDescription, progression, pined FROM projects', "projects");
		
		foreach ($projects as $project) {
			$result[] = $project->exec();
		}

		exit(json_encode($result));

	}elseif ($res == "videos") { 

		$result = [];

		$videos = $db->query('SELECT * FROM videos', "videos");
		
		foreach ($videos as $video) {
			$result[] = $video->exec();
		}

		exit(json_encode($result));

	}elseif($res == "project"){

		$project = $db->query('SELECT * FROM projects WHERE id = "'.$_GET['id'].'"', "project")[0];

		exit(json_encode($project->exec()));


	}elseif ($res == "doc") {
		
	}elseif ($res == "user_connection_state"){

		if (isset($_SESSION["user_id"])) {
			exit(json_encode($db->query('SELECT name, firstname, mail, pseudo FROM users WHERE id = "'.$_SESSION["user_id"].'"')[0]));
		}else{
			exit("Empty");
		}

	}

}if ($method == "POST") {
	if ($res == "admin::newuser") {

		if (isset($_SESSION["admin"]) && $_SESSION["admin"] == "indse") {
			if (isset($_POST['name'])&& isset($_POST['firstname'])&& isset($_POST['email'])&& isset($_POST['pseudo'])&& isset($_POST['password'])) {
				if (!empty($_POST['name'])&& !empty($_POST['firstname'])&& !empty($_POST['email'])&& !empty($_POST['pseudo'])&& !empty($_POST['password'])) {
					
					$name = $_POST['name'];
					
					$firstname = $_POST['firstname'];
					
					$email = $_POST['email'];
					
					$pseudo = $_POST['pseudo'];
					
					$password = sha1(md5($_POST['password']) . sha1($_POST['email']));

					/*if () {
						exit('Ok');
					}else{
						exit("Server error");
					}*/

					if($db->query("INSERT INTO users VALUES (NULL, '$name', '$firstname', '$email', '$pseudo', '$password')", "none", true)){
						exit('Créé');
					}else{
						exit("server__error");
					}

				}else{
					exit("e");
				}
			}else{
				exit("Erreur");
			}
		}else{
			exit('Error : you must be connected');
		}

	}
}
 ?>