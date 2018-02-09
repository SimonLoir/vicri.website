<?php
session_start();
header('Content-Type:application/json');
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

// Request method
if (isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
    $method = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'];
} else {
    $method = $_SERVER['REQUEST_METHOD'];
}

$res = $_GET["res"];

include "config.php";

include 'Class/autoloader.php';

spl_autoload_register(["autoloader", "load"]);

$db = new db($db__base, $db__user, $db__pass, $db__host);

// Default errors
$user_login_error = json_encode(["isConnected" => false]);
$user_must_be_logged_in = json_encode(["type" => "error", "message" => "user must be logged in"]);

if ($method == "GET") {
    switch ($res) {
        case "login":

            if (isset($_SESSION['id'])) :

                exit(user::export());

            else :

                exit($user_login_error);

            endif;

            break;

        case "user-projects":

            if (!isset($_SESSION["id"])) {
                exit($user_must_be_logged_in);
            }

            $projects = new project_list($db);

            $projects->getProjectsForUser($_SESSION["id"]);

            $projects->convertManagersIDArrayToNamesArray();

            exit($projects->export());

            break;

        case "project":

            if (!isset($_GET["id"])) {
                exit("error : missing query string id");
            }

            $id = $_GET["id"];

            $project = new project($db, $id, isset($_GET["manager"]));

            $project->convertManagersIDArrayToNamesArray();

            exit($project->export());

            break;

        case "projects":

            $projects = new project_list($db);

            $projects->getAll();

            $projects->convertManagersIDArrayToNamesArray();

            exit($projects->export());

            break;
        
        case "videos":

            $videos = new video_list($db);

            $videos->getAll();

            exit($videos->export());

            break;

        case "photos":

            $photos = new photo_list($db);

            $photos->getAll();

            exit($photos->export());

            break;

        case "users":

            $users = new users_array($db);

            exit($users->export());

            break;

        case "history":

            if (!isset($_GET["id"])) {
                exit("error : missing query string id");
            }

            $project_history = new history($db, $_GET["id"]);

            exit($project_history->export());

            break;

        case "logout":

            user::logout();

            break;

        case "pv":

            $pvs = new pv_list();

            exit($pvs->export());

            break;

        default:

            http_response_code(500);

            exit('error');

            break;
    }
} else if ($method == "POST") {
    switch ($res) {
        case 'new_user':

            ( $_SESSION['status'] != "admin" ) ? exit( "user must be an admin" ): '';
            
            user::create($db, $_POST);

            break;

        case 'login':

            user::login($db, $_POST);

            break;

        case "user":

            $project = new project($db, $_POST["project_id"], true);

            $project->addManager($_POST["user_id"]);

            exit("e");

            break;

        case "project":

            $project = new project($db);

            $project->create($_POST);

            break;

        case "video":

            $id = $_POST["project_id"];

            $project = new project($db, $id, true);

            $project->publishVideo($_POST);

            break;

        case "photo":

            $id = $_POST["project_id"];

            $project = new project($db, $id, true);

            $project->publishPhotoFolder($_POST);

            break;

        case "image":

            $fs = new file_manager();

            $fs->uploadImage($_FILES["file"], "../res/uploads/");

            break;    

        default:

            http_response_code(500);

            exit('error');
            break;
    }
} else if ($method == "PUT") {
    switch ($res) {

        case "project":

            if (!isset($_POST["id"])) {
                exit('error : missing query string id');
            }

            $project = new project($db, $_POST["id"], true);

            $project->update($_POST);

            break;

        default:
            http_response_code(500);

            exit('error');
            break;
    }
} else if ($method == "DELETE") {
    switch ($res) {
        case "user":

            $project = new project($db, $_GET["project_id"], true);

            $project->removeManager($_GET["user_id"]);

            exit("e");

            break;
    }
}

?>