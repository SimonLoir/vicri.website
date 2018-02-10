<?php
class project_list{
    
    private $projects;
    
    private $db;

    /**
     * Sets the list of project
     * @param projects The list of projects
     */
    private function setProjects($projects){
        $this->projects = $projects;
    }
    /**
     * Creates a new project_list instance
     * @param db the database that we need to use
     */
    function __construct($db) {
        $this->db = $db;
    }
    /**
     * Gets all the projects that are stored in the database
     */
    public function getAll(){
        $this->setProjects($this->db->query('SELECT id, name, managers, shortDescription, progression, pined FROM projects ORDER BY pined DESC, id DESC'));
    }
    /**
     * Gets all the projects for the specific user
     * @param user the user for which we have to get the projects
     */
    public function getProjectsForUser($user){

        if($_SESSION["status"] != "admin"){
            $projects = $this->db->query('SELECT * FROM projects WHERE managers LIKE :id', [
                "prepare" => [
                    ":id" => "%" . $user . "%"
                ]
            ]);
        }else{
            $projects = $this->db->query('SELECT * FROM projects');
        }
 
        

        
        foreach ($projects as $key => $project) {
            $managers = explode(";", $project->managers);
            if(!in_array("" . $user, $managers) && $_SESSION["status"] != "admin"){
                unset($projects[$key]);
            }
        }

        $this->setProjects($projects);
    }
    /**
     * Converts the array of manager's ids into an array of names (as string) 
     */
    public function convertManagersIDArrayToNamesArray() {
        
        $users = new users_array($this->db);

        foreach ($this->projects as $i => $project) {
            $users_id = explode(";", $project->managers);
            $this->projects[$i]->managers = $users->getUsersNamesFromArray($users_id);
        }

    }

    public function getIDs(){
        
        $ids = [];
        
        foreach ($this->projects as $project) {

            $ids[] = $project->id;

        }

        return $ids;
    }

    /**
     * 
     */
    public function export() {
        return json_encode(array_values($this->projects));
    }
}
?>