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

		$projects = $db->query('SELECT id, name, managers, shortDescription, progression FROM projects', "projects");
		
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
		
	}
}if ($method == "POST") {
	if ($res == "admin::newuser") {



	}elseif($res == "uconnect"){

		if (isset($_POST['key']) && $_POST['key'] == "ViCri2016__Access__Key#V2") {
			exit('');
		}else{
			exit("uError");
		}


	}
}
 ?>