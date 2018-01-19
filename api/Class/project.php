<?php
class project{
    
    private $project;
    
    private $db;
    
    function __construct($db, $id) {
        $this->db = $db;
        $this->project = $db->query('SELECT * FROM projects WHERE id = :id', [
            "prepare" => [
                ":id" => $id
            ]
        ])[0];
    }
    
    public function convertManagersIDArrayToNamesArray(){
        
        $users = new users_array($this->db);
        $users_id = explode(";", $this->project->managers);
        
        $this->project->managers_id = $users_id;

        if(isset($_SESSION["id"]) && in_array($_SESSION["id"], $users_id)){
            $this->project->isManager = true;
        }else{
            $this->project->isManager = false;            
        }
        
        $this->project->managers = $users->getUsersNamesFromArray($users_id);
        
    }

    public function export(){
        return $this->project;
    }
}
?>