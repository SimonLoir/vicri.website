<?php
function is_set($e){
    if(!empty(trim($e))){
        return true;
    }else{
        return false;
    }
}
class User{

    /**
     * Creates a new user in the database. User must be an admin to create a new user.
     * 
     */
    public static function create($db, $data){

        

        if($_SESSION["status"] != "admin"){
            exit('User requires higher privileges');
        }

        $name = $data['name'];
        $firstname = $data['firstname'];
        $email = $data['mail'];
        $pseudo = $data['pseudo'];
        $password = password_hash($data['password'] , PASSWORD_DEFAULT);

        if(!is_set($name) || !is_set($firstname) || !is_set($email) || !is_set($pseudo) || !is_set($password)){
            exit('Fatal error');
        }

        $is_user = $db->query("SELECT * FROM users WHERE mail = :email", [
            'prepare' => [
                ':email' => $email
            ]
        ]);

        if($is_user){
            exit('User exists');
        }

        if($db->query("INSERT INTO users VALUES (NULL, :name, :firstname, :email, :pseudo, :password, '')", [
            "prepare" => [":name" => $name, ":firstname" => $firstname, ":email" => $email, ":pseudo" => $pseudo, ":password" => $password],
            "result" => true
        ])){
            exit('ok');
        }else{
            exit("error");
        }
    }

    /**
     * Logs the user in with the data given as an array 
     * @param db the db instance
     * @param data assoc array that must contains user_email and user_password
     */
    public static function login($db, $data){

        if (!isset($data['user_email'])) {
            exit($user_login_error);
        }
    
        if (!isset($data['user_password'])) {
            exit($user_login_error);
        }
        
        $user = $db->query('SELECT * FROM users WHERE mail = :mail', [
            "prepare" => [":mail" => $data['user_email']]
        ])[0];
    
        if (!$user) {
            exit($user_login_error);
        }
    
        if (password_verify($data['user_password'],$user->password)) {
    
            $_SESSION['user'] = $user->firstname . " " .$user->name;
            
            $_SESSION['id'] = $user->id;
            
            $_SESSION['email'] = $user->mail;

            $_SESSION['status'] = $user->status;

            exit((new user)->export());
    
        }else{
            exit($user_login_error);
        }

    }

    /**
     * Logs the user out
     */
    public static function logout(){

        session_destroy();

    }

    /**
     * Exports the connection state of the current user
     */
    public static function export(){
        return json_encode([
        
            "isConnected" => true,
        
            "name" => $_SESSION['user'],
        
            "email" => $_SESSION["email"],
        
            "isINDSEUser" => ( strstr( $_SESSION["email"], "@indse.be" ) ) ? true : false,

            "isAdmin" => (isset($_SESSION["status"]) && $_SESSION["status"] == "admin") ? true : false,

            "status" => $_SESSION["status"]
        
        ]);
    }

}