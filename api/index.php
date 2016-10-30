<?php
session_start();
//$_SESSION['user_id'] = 1;

//On récupère la méthode
if (isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {

	$method = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'];

}else{

	$method = $_SERVER['REQUEST_METHOD'];
	
}


if (!isset($_GET['res']) || empty($_GET['res']) ) {
	$res = "doc";
}else{
	$res = $_GET['res'];
}

if ($res != "doc" && $res != "indev") {
	header('Content-Type:application/json');
}

/* --- --- --- --- --- --- --- --- --- --- */
/*  => */include "../../config.php"; /* <= */
/* --- --- --- --- --- --- --- --- --- --- */

/*
Initialisation de l'autoloader
*/

include 'Class/autoloader.php';
spl_autoload_register(["autoloader", "load"]);

$db = new db($db__base, $db__user , $db__pass, $db__host);

/* 
* Method : get
 */
if ($method == "GET") {
	if ($res == "projects") { 

		$result = [];

		$projects = $db->query('SELECT id, name, managers, shortDescription, progression, pined FROM projects', ['class'=> "projects"]);
		
		foreach ($projects as $project) {

			$result[] = $project->clientFormat();

		}

		 exit(json_encode($result));

	}elseif ($res == "videos") { 

		$result = [];

		$videos = $db->query('SELECT * FROM videos', ['class'=> "videos"]);
		
		foreach ($videos as $video) {

			$result[] = $video->clientFormat();

		}

		exit(json_encode($result));

	}elseif($res == "project"){

		$project = $db->query('SELECT * FROM projects WHERE id = :project_id', [
			"class" => "project",
			"prepare" => [":project_id" => $_GET['id']],
			"one" => true
		]);

		exit(json_encode($project->clientFormat()));


	}elseif ($res == "doc") {

		include 'docu.php';

	}elseif ($res == "user_connection_state"){

		if (isset($_SESSION["user_id"])) {

			exit(json_encode($db->query('SELECT name, firstname, mail, pseudo FROM users WHERE id = :user_id', [

				"prepare" => [":user_id" => $_SESSION['user_id']] 

			])));

		}else{

			exit("Empty");

		}

	}elseif ($res == "indev"){

		exit("Dev area");

	}elseif ($res == "logout"){

		session_destroy();

		header('Location: ../');

	}

}if ($method == "POST") {
	if ($res == "admin::newuser") {

		if (isset($_SESSION["user_id"]) && $_SESSION["user_id"] == 1) {

			if (isset($_POST['name'])&& isset($_POST['firstname'])&& isset($_POST['email'])&& isset($_POST['pseudo'])&& isset($_POST['password'])) {

				if (!empty($_POST['name'])&& !empty($_POST['firstname'])&& !empty($_POST['email'])&& !empty($_POST['pseudo'])&& !empty($_POST['password'])) {
					
					$name = $_POST['name'];
					
					$firstname = $_POST['firstname'];
					
					$email = $_POST['email'];
					
					$pseudo = $_POST['pseudo'];
					
					$password = password_hash($_POST['password'] , PASSWORD_DEFAULT);

					if($db->query("INSERT INTO users VALUES (NULL, :name, :firstname, :email, :pseudo, :password)", [

						"prepare" => [":name" => $name, ":firstname" => $firstname, ":email" => $email, ":pseudo" => $pseudo, ":password" => $password],
						"result" => true

					])){
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

	}elseif($res == "login"){

		if (!isset($_POST['email']) || !isset($_POST['password'])) {

			exit(json_encode("Error : the server can't execute that request !"));

		}

		$user_infos = $db->query('SELECT * FROM users WHERE mail = :email', [

			"prepare" => [":email" => $_POST['email']]

		]);

		if ($user_infos != null) {
			
			if (password_verify($_POST['password'],$user_infos[0]->password)) {

				$_SESSION['user_id'] = $user_infos[0]->id;

				exit(json_encode("ok"));

			}else{

				exit(json_encode("Error : incorrect password"));

			}

		}else{

			exit(json_encode("Error : can't find the user"));

		}
		
	}
}
 ?>