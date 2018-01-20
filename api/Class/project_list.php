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

    public function getProjectsForUser($user){
        $projects = $this->db->query('SELECT * FROM projects WHERE managers LIKE :id', [
            "prepare" => [
                ":id" => "%" . $user . "%"
            ]
        ]);

        foreach ($projects as $key => $project) {
            $managers = explode(";", $project->managers);
            if(!in_array("" . $user, $managers)){
                unset($projects[$key]);
            }
        }

        $this->setProjects($projects);
    }

    public function convertManagersIDArrayToNamesArray() {
        
        $users = new users_array($this->db);

        for ($i=0; $i < sizeof($this->projects); $i++) { 
            $users_id = explode(";", $this->projects[$i]->managers);
            $this->projects[$i]->managers = $users->getUsersNamesFromArray($users_id);
        }
        
    }

    public function export() {
        return json_encode($this->projects);
    }
}
?>