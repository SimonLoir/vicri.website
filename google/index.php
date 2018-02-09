<?php
session_start();

require 'vendor/autoload.php';

if (isset($_SESSION['id'])) {
    header('Location: ../dashboard-home');
    exit("déjà connecté");
}

$client = new Google_Client();
$client->setAuthConfigFile('client_secret.json');
if ($_SERVER['HTTP_HOST'] == "simonloir.be") {
    $client->setRedirectUri('https://' . $_SERVER['HTTP_HOST'] . '/vicri/google');
} elseif ($_SERVER['HTTP_HOST'] == "vicri.simonloir.be") {
    $client->setRedirectUri('https://' . $_SERVER['HTTP_HOST'] . '/google');
} elseif ($_SERVER['HTTP_HOST'] == "localhost") {
    $client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/vicri/vicri2.0/google');
} else {
    $client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/vicri/google');
}
$client->setScopes('email');

if (isset($_REQUEST['logout'])) {

    session_destroy();

}

if (isset($_GET['code'])) {

    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);

    $client->setAccessToken($token);

    var_dump($_SESSION["id_token_token"]);

    $client->setAccessToken($token);

    if ($client->getAccessToken()) {

        $token_data = $client->verifyIdToken();
    
    }

    $user_email = $token_data["email"];

    var_dump($user_email);

    include '../api/Class/db.php';
    /* --- --- --- --- --- --- --- --- --- --- */
    /*  => */ include "../api/config.php"; /* <= */
    /* --- --- --- --- --- --- --- --- --- --- */
    $db = new db($db__base, $db__user, $db__pass, $db__host);

    $user_infos = $db->query('SELECT * FROM users WHERE mail = :email', [

        "prepare" => [":email" => $user_email]

    ]);

    if ($user_infos != null) {

        $user = $user_infos[0];

        $_SESSION['user'] = $user->firstname . " " .$user->name;
        $_SESSION['id'] = $user->id;
        $_SESSION['email'] = $user->mail;
        $_SESSION['status'] = $user->status;

        header('Location: ../dashboard-home');

    } else {

        session_destroy();
        header('Location: ../#page=login;action=unf');
        exit(json_encode("L'utilisateur est introuvable"));

    }

}else{

    $authUrl = $client->createAuthUrl();
    
    header("Location: " . $authUrl);

}

?>