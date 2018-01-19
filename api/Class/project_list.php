<?php
class project_list{

    private $projects;
    private $db;

    private function setProjects($projects){
        $this->projects = $projects;
    }

    function __construct($db) {
        $this->db = $db;
    }

    function getProjectsForUser($user){
        $projects = $this->db->query('SELECT * FROM projects WHERE managers LIKE :id', [
            "prepare" => [
                ":id" => "%" . $user . "%"
            ]
        ]);
        $this->setProjects($projects);
    }

    public function convertManagersIDArrayToNamesArray() {
        
        $users = new users_array($this->db);

        for ($i=0; $i < sizeof($this->projects); $i++) { 
            $users_id = explode(";", $this->projects[$i]->managers);
            $this->projects[$i]->managers = $users->getUsersNamesFromArray($users_id);
        }
        
        /*
        $user->getUserInfos()*/
    }

    public function export() {
        return $this->projects;
    }
}
?>