<?php
require 'vendor/autoload.php';

session_start();

$client = new Google_Client();
$client->setAuthConfigFile('client_secret.json');
$client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'].'/vicri/google');
$client->setScopes('email');

if (isset($_REQUEST['logout'])) {

  unset($_SESSION['id_token_token']);

}

if (isset($_GET['code'])) {

  $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);

  $client->setAccessToken($token);

  $_SESSION['id_token_token'] = $token;

  header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));

}
if (

  !empty($_SESSION['id_token_token'])

  && isset($_SESSION['id_token_token']['id_token'])

) {

  $client->setAccessToken($_SESSION['id_token_token']);

} else {

  $authUrl = $client->createAuthUrl();

}

if ($client->getAccessToken()) {

  $token_data = $client->verifyIdToken();

}

if (isset($authUrl)){
  echo $authUrl;
  header("Location: " . $authUrl);
}else{
	echo "Your email : " ;
	echo json_encode($token_data["email"]);
}

?>