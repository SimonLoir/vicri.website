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

header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");


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

		$projects = $db->query('SELECT id, name, managers, shortDescription, progression, pined FROM projects ORDER BY pined DESC, id DESC', ['class'=> "projects"]);

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

		if ($project->type == "video") {
				$video = $db->query('SELECT * FROM videos WHERE id = :project_id', [
					"class" => "videos",
					"prepare" => [":project_id" => $_GET['id']]
				]);

				if ($video != null) {
					$project->video = $video[0];
				}
		}

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

	}elseif($res == "calendar"){
		$end = array();

		$events = $db->query('SELECT * FROM events ORDER BY date', [
			'class'=> "events"
		]);



		foreach ($events as $event) {

			$end[] = $event->clientFormat();

		}

		exit(json_encode($end));

	}

}

if ($method == "POST") {
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

	}elseif($res == "new_project"){

		if (!isset($_SESSION['user_id'])) {
			exit(json_encode('You must be logged in !'));
		}

		if (!isset($_POST['name']) || !isset($_POST['desc'])) {
			exit(json_encode("ERROR / request : POST params = name and desc"));
		}

		if (empty($_POST['name']) || empty($_POST['desc'])) {
			exit(json_encode("ERROR / request : empty POST param :  name or desc"));
		}

		if ($db->query('INSERT INTO projects VALUES(NULL, :name, :user_id , "video", 0, 0, "/", :descri, "/", "/")', [
			"result" => true,

			"prepare" => [
				":user_id" => $_SESSION['user_id'],
				":name" => $_POST['name'],
				":descri" => $_POST['desc']
				]

			])) {

			exit(json_encode('Ok'));

		}else{
			exit(json_encode('Server error'));
		}
	}elseif($res == "new_event"){
		if (!isset($_SESSION['user_id'])) {
			exit(json_encode('You must be logged in !'));
		}

		if (!isset($_POST['title']) || !isset($_POST['desc']) || !isset($_POST['date'])) {
			exit(json_encode("ERROR / request : POST params = name and desc and date"));
		}

		if (empty($_POST['title']) || empty($_POST['desc']) || empty($_POST['date'])) {
			exit(json_encode("ERROR / request : empty POST param :  name or desc or date"));
		}


		if ($db->query('INSERT INTO events VALUES(NULL, :title, :descri , :date, 1, 0)', [
			"result" => true,

			"prepare" => [
				":title" => $_POST['title'],
				":descri" => $_POST['desc'],
				":date" => $_POST['date']
				]

			])) {

			exit(json_encode('ok'));

		}else{
			exit(json_encode('Server error'));
		}

	}elseif($res == "publish_video"){
		if (!isset($_GET['pid'])) {
			exit(json_encode('error'));
		}

		if (!isset($_POST['id']) || empty($_POST['id'])) {
			exit(json_encode('error'));
		}

		if (!isset($_POST['title'])  || empty($_POST['title'])) {
			exit(json_encode('error'));
		}

		if (!isset($_POST['description'])  || empty($_POST['description'])) {
			exit(json_encode('error'));
		}

		$project_id = $_GET['pid'];

		$id = $_POST['id'];

		$title = $_POST['title'];

		$description = $_POST['description'];

		$project = $db->query('SELECT managers FROM projects WHERE id = :project_id', [
			"class" => "project",
			"prepare" => [":project_id" => $project_id],
			"one" => true
		]);

		if ($project->clientFormat() == "UError") {
			exit(json_encode('error'));
		}
		
		$video = $db->query('SELECT * FROM videos WHERE id = :project_id', [
			"class" => "videos",
			"prepare" => [":project_id" => $project_id]
		]);

		if ($video != null) {
			exit(json_encode('fatal error'));
		}

		if($db->query("INSERT INTO videos VALUES (:pid,:id,\"youtube\", :title, :description)", [
			"prepare" => [
				":pid" => $project_id,
				":id" => $id,
				":title" => $title,
				":description" => $description
			],
			"result" => true
		])){
			exit(json_encode("ok"));
		}else{
			exit(json_encode("serror"));
		}

	}
}

if ($method == "PUT") {
	if ($res == "project") {

		if (!isset($_POST["id"]) || empty($_POST["id"])) {
			exit(json_encode("Une erreur est survenue au niveau du serveur"));
		} 

		if (!isset($_POST["name"]) || empty($_POST["name"])) {
			exit(json_encode("Une erreur est survenue : merci de renseigner le nom du projet"));
		} 

		$name = $_POST["name"];
		
		if (!isset($_POST["short_description"]) || empty($_POST["short_description"])) {
			exit(json_encode("Une erreur est survenue : merci de renseigner la description courte "));
		} 

		$short_description = $_POST["short_description"];
		
		if (!isset($_POST["description"]) || empty($_POST["description"])) {
			exit(json_encode("Une erreur est survenue : merci de renseigner la description"));
		}

		$description = $_POST["description"];

		if (!isset($_POST["progression"])) {
			exit(json_encode("Une erreur est survenue : merci de renseigner la progression"));
		} 

		$progression = intval($_POST["progression"]);
		
		if (!isset($_POST["goals"]) || empty($_POST["goals"])) {
			exit(json_encode("Une erreur est survenue : merci de renseigner les objectifs de votre projet"));
		} 

		$goals = $_POST["goals"];
		
		if (!isset($_POST["links"]) || empty($_POST["links"])) {
			exit(json_encode("Une erreur est survenue : merci de renseigner les liens de votre projet"));
		} 

		$links = $_POST["links"];
		
		if (!isset($_POST["type"]) || empty($_POST["type"])) {
			exit(json_encode("Une erreur est survenue : merci de renseigner le type de projet"));
		} 

		$type = $_POST["type"];

		$user = $_SESSION['user_id'];

		$project = $db->query('SELECT * FROM projects WHERE id = :project_id', [
			"class" => "project",
			"prepare" => [":project_id" => $_POST['id']],
			"one" => true
		]);

		$project->clientFormat();

		if ($project == "UError") {
			exit("Vous n'avez pas le droit de modifier ce projet");
		}

		$project->setDb($db);

		$project->updateName($name);

		$project->updateDescription($description);

		$project->updateShortDescription($short_description);

		$project->updateGoals($goals);

		$project->updateLinks($links);

		$project->updateType($type);

		$project->updateProgression($progression);

		if ($project->error == true) {
			exit(json_encode("Une erreur est survenue lors de la modification de votre projet"));
		}

		exit(json_encode("Ok"));

	}
}
 ?>
