<?php 

exit(json_encode("Service désactivé..."));

include "vendor/autoload.php";


/* --- --- --- --- --- --- --- --- --- --- */
/*  => */include "../../config.php"; /* <= */
/* --- --- --- --- --- --- --- --- --- --- */

if (!isset($_POST['token'])) {
	exit('Token error');
}else{
	$token = $_POST['token'];
}

$client = new Google_Client();

$client->setDeveloperKey($google_api_key);

$client->getHttpClient()->setDefaultOption('verify', false);

try {
	$ticket = $client->verifyIdToken($token);
} catch (Exception $e) {
	exit(json_encode($e));
}



?>