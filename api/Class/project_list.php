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

    public function getAll(){
        $this->setProjects($this->db->query('SELECT id, name, managers, shortDescription, progression, pined FROM projects ORDER BY pined DESC, id DESC'));
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

        foreach ($this->projects as $i => $project) {
            $users_id = explode(";", $project->managers);
            $this->projects[$i]->managers = $users->getUsersNamesFromArray($users_id);
        }

        /*for ($i=0; $i < sizeof($this->projects); $i++) { 
            
        }*/

        
    }

    public function export() {
        return json_encode(array_values($this->projects));
    }
}
?>