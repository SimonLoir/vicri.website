<?php
class users_array{

    private $db;
    
    private $all_users;

    private $_cache = [];

    /**
     * Creates an array of users
     * @param db the database to use
     */
    function __construct($db){
        
        $this->db = $db;

        $this->all_users = $this->db->query('SELECT id, name, firstname, mail, pseudo FROM users');

    }
    /**
     * Gets the names of the user that have the ids that are in users_id
     */
    public function getUsersNamesFromArray($users_id){

        $result = [];

        foreach ($users_id as $id) {
            
            $name =  $this->getUserNameFromID($id);

            if($name != false){
                $result[] = $name;
            }
            

        }
        
        return $result;

    }
    /**
     * Gets the username of an user via his id
     */
    public function getUserNameFromID($id){
        
        $user_infos = $this->getUserInfosFromID($id);

        if($user_infos != null){
            return ucwords($user_infos->firstname . " " .  $user_infos->name);
        }else{
            return null;
        }

    }
    /**
     * Gets the informations of an user via his id
     */
    public function getUserInfosFromID($id){
        
        if(isset($this->_cache[$id])){
            return $this->_cache[$id];
        }

        foreach ($this->all_users as $user) {
            if($user->id == $id){
                $this->_cache[$id] = $user;
                return $user;
            }
        }

    }
}
?>