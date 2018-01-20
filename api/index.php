<?php
session_start();
header('Content-Type:application/json');
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

// Request method
if (isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
	$method = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'];
}else{
	$method = $_SERVER['REQUEST_METHOD'];
}

$res = $_GET["res"];

include "config.php";

include 'Class/autoloader.php';

spl_autoload_register(["autoloader", "load"]);

$db = new db($db__base, $db__user , $db__pass, $db__host);

// Default errors
$user_login_error = json_encode(["isConnected" => false]);
$user_must_be_logged_in = json_encode(["type" => "error", "message" => "user must be logged in"]);

if ($method == "GET"){
    switch ($res) {
        case "login":
            
            if(isset($_SESSION['id'])){
            
                exit(json_encode([
                    "isConnected" => true,
                    "name" => $_SESSION['user'],
                    "email" => $_SESSION["email"],
                    "isINDSEUser" => ( strstr( $_SESSION["email"], "@indse.be" ) ) ? true : false
                ]));
                
            }else{
                exit($user_login_error);
            }

            break;

        case "user-projects":

            if(!isset($_SESSION["id"])){exit($user_must_be_logged_in);}
            
            $projects = new project_list($db);
        
            $projects->getProjectsForUser($_SESSION["id"]);

            $projects->convertManagersIDArrayToNamesArray();

            exit($projects->export());

            break;
        
        case "project":
            
            if(!isset($_GET["id"])){exit("error : missing query string id");}
            
            if(!isset($_SESSION["id"])){exit($user_must_be_logged_in);}
            
            $id = $_GET["id"];

            $project = new project($db, $id, isset($_GET["manager"]));

            $project->convertManagersIDArrayToNamesArray();

            exit($project->export());

            break;

        case "history":
            
            if(!isset($_GET["id"])){exit("error : missing query string id");}
            
            $project_history = new history($db, $_GET["id"]);
            
            exit($project_history->export());

            break;

        case "logout":

            session_destroy();
        
            break;

        default:
        
            exit('error');
            
            break;
    }
}else if ($method == "POST"){
    switch ($res) {
        case 'login':
            if (!isset($_POST['user_email'])) {
                exit($user_login_error);
            }
        
            if (!isset($_POST['user_password'])) {
                exit($user_login_error);
            }
            
            $user = $db->query('SELECT * FROM users WHERE mail = :mail', [
                "prepare" => [":mail" => $_POST['user_email']]
            ])[0];
        
            if (!$user) {
                exit($user_login_error);
            }
        
            if (password_verify($_POST['user_password'],$user->password)) {
        
                $_SESSION['user'] = $user->firstname . " " .$user->name;
                $_SESSION['id'] = $user->id;
                $_SESSION['email'] = $user->mail;

                exit(json_encode([
                    "isConnected" => true,
                    "name" => $_SESSION['user'],
                    "email" => $_SESSION["email"],
                    "isINDSEUser" => (strstr($_SESSION["email"], "@indse.be")) ? true : false
                ]));
        
            }else{
                exit($user_login_error);
            }
            break;
        
        default:
            break;
    }
}

?>