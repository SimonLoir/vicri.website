<?php
class project{
    
    private $project;
    
    private $db;

    private $id;

    private $users;

    private $errors;
    
    /**
     * Creates a new instance of the project object. 
     * @param db the database to use
     * @param id the id of the project to get
     * @param must_be_manager specifies wether or not the user must be a manager
     */
    function __construct($db, $id = null, $must_be_manager = false) {
        
        $this->db = $db;
        
        if($id != null){
            
            $this->id = $id;
    
            $this->getProjectFromDB();
    
            $this->users = new users_array($this->db);
            
            $this->errors = [
                "user_must_be_logged_in" => json_encode(["type" => "error", "message" => "Cette partie est réservée aux managers du projet"])
            ];
    
            if($must_be_manager){
                if(!$this->isManager()){
                    exit($this->errors["user_must_be_logged_in"]);
                }
            }
        }

    }

    /**
     * Adds a manager to a project
     * @param id, the id of the manager
     */
    public function addManager($id){

        $this->convertManagersIDArrayToNamesArray();

        if(in_array($id, $this->project->managers_id)){
            exit('Error : user is already in project');
        }


        array_push($this->project->managers_id, $id);

        $this->update(['managers' => implode(";", $this->project->managers_id)]);

        exit();

    }


    /**
     * removes a manager to a project
     * @param id, the id of teh manager
     */
    public function removeManager($id){

        $this->convertManagersIDArrayToNamesArray();

        if(!in_array($id, $this->project->managers_id)){
            exit('Error : user is not in the project');
        }

        $index = array_search($id, $this->project->managers_id);

        if($index !== false){
            unset($this->project->managers_id[$index]);
        }

        if($this->project->managers_id == null){
            exit('Impossible de supprimer le manager unique du projet');
        }

        $this->update(['managers' => implode(";", $this->project->managers_id)]);

        exit();

    }

    /**
     * Creates a project from data
     * @param data the informations about the project must contains 
     * @param data.name
     * @param data.shortDescription
     * @param data.type
     */
    public function create($data){

        if(!isset($_SESSION["id"])){exit('E_CON');}

        if(!isset($data["name"])){exit('E_NAME');}

        if(!isset($data["shortDescription"])){exit('E_DESC');}

        if(!isset($data["type"])){exit('E_TYPE');}

        $ok = $this->db->query('INSERT INTO projects VALUES(NULL, :name, :user_id , :xtype, 0, 0, "/", :descri, "/", "/")', [
			"result" => true,
			"prepare" => [
                ":user_id" => $_SESSION['id'],
                ":xtype" => $data["type"],
				":name" => $data['name'],
				":descri" => $data['shortDescription']
				]
        ]);
        
        if($ok){
            $this->db->query('INSERT INTO history VALUES (NULL, "project_created", :c, :id)', [
                "prepare" => [
                    ":c" => json_encode([
                        "user" => "$" ."{user." . $_SESSION["id"] . "}",
                        "name" => $data["name"],
                        "date" => date('d/m/Y')
                    ]), 
                    ":id" => -1
                ]
            ]);
            exit('ok');
        }else{
            exit('fatal error');
        }

    }

    /**
     * Gets the project from the database. It also checks if the project has been published or not.
     */
    private function getProjectFromDB(){
        $this->project = $this->db->query('SELECT * FROM projects WHERE id = :id', [
            "prepare" => [
                ":id" => $this->id
            ]
        ])[0];

        $this->project->video = $this->db->query('SELECT * FROM videos WHERE id = :id', [
            "prepare" => [
                ":id" => $this->id
            ],
            "one" => true
        ]);

        $this->project->other = $this->db->query('SELECT * FROM other_projects WHERE id = :id', [
            "prepare" => [
                ":id" => $this->id
            ],
            "one" => true
        ]);
        
        $this->project->photo = $this->db->query('SELECT * FROM photos_folders WHERE id = :id', [
            "prepare" => [
                ":id" => $this->id
            ],
            "one" => true
        ]);
        
        if($this->project->video || $this->project->other || $this->project->photo){
            $this->project->isPublished = true;
        }else{
            $this->project->isPublished = false;
        }
    }
    /**
     * Checks if the user is manager of the project
     */
    private function isManager(){
        
        $users_id = explode(";", $this->project->managers);

        if(isset($_SESSION["id"]) && in_array($_SESSION["id"], $users_id)){
            $this->project->isManager = true;
        }else{
            if($_SESSION["status"] == "admin"){
                $this->project->isManager = true;            
            }else{
                $this->project->isManager = false;
            }
        }
        
        return $this->project->isManager;
    }
    /**
     * Converts an array of manager's ids into an array of manager's names.
     */
    public function convertManagersIDArrayToNamesArray(){
        
        $users_id = explode(";", $this->project->managers);
        
        $this->project->managers_id = $users_id;
        
        $this->project->managers = $this->users->getUsersNamesFromArray($users_id);
        
    }
    /**
     * Updates a project with the given associative array
     * @param e An associative array which keys are cells to update in the database and values are values to set in the cells.
     */
    public function update($e){
        
        $keys = ["id","name","progression","description","shortDescription","type","goals","links", "managers"];

        unset($e["id"]);

        $error = false;

        $props = [];

        $count = 0;

        foreach ($e as $key => $value) {

            if($value != $this->project->$key && in_array($key, $keys)){

                $count++;

                if($this->db->query('UPDATE projects SET ' . $key .' = :v WHERE id = :id', [
                    "prepare" => [
                        ":v" => $value,
                        ":id" => $this->id
                    ],
                    "result" => true
                ])){

                    $props[] = $key;
                
                }else{
                
                    $error = true;
                
                }
            }

        }

        if(!$error && $count != 0){
            $this->db->query('INSERT INTO history VALUES (NULL, "project_update", :c, :id)', [
                "prepare" => [
                    ":c" => json_encode([
                        "user" => "$" ."{user." . $_SESSION["id"] . "}",
                        "date" => date('d/m/Y'),
                        "props" => $props
                    ]), 
                    ":id" => $this->id
                ]
            ]);
            exit("ok");
        }else if($count == 0){
            exit('ok');
        }else{
            exit('impossible de mettre à jour une partie du projet');
        }

    }

    /**
     * Publishes the final result of a video project
     */
    public function publishVideo($data) {

        if(!isset($data["project_id"])){ exit("missing project_id"); }
        if(!isset($data["url"])){ exit("missing url"); }
        if(!isset($data["title"])){ exit("missing title"); }
        if(!isset($data["description"])){ exit("missing description"); }

        if($this->project->isPublished == false){
            if($this->db->query("INSERT INTO videos VALUES (:pid,:id,\"youtube\", :title, :description)", [
                "prepare" => [
                    ":pid" => $data["project_id"],
                    ":id" => $data["url"],
                    ":title" => $data["title"],
                    ":description" => $data["description"]
                ],
                "result" => true
            ])){
                exit( "ok" );
            }else{
                exit( "error" );
            }
        }else{
            exit('Projet déjà publié');
        }
    }

    /**
     * Publishes a folder of photos
     */
    public function publishPhotoFolder($data){
        if(!isset($data["project_id"])){ exit("missing project_id"); }
        if(!isset($data["title"])){ exit("missing title"); }
        if(!isset($data["description"])){ exit("missing description"); }
        if(!isset($data["cover"])){ exit("missing cover"); }

        if($this->project->isPublished == false){
            if($this->db->query("INSERT INTO photos_folders VALUES (:pid,:title, :description, :cover)", [
                "prepare" => [
                    ":pid" => $data["project_id"],
                    ":cover" => $data["cover"],
                    ":title" => $data["title"],
                    ":description" => $data["description"]
                ],
                "result" => true
            ])){
                exit( "ok" );
            }else{
                exit( "error" );
            }
        }else{
            exit('Projet déjà publié');
        }
    }

    /**
     * Exports the project as a json object
     */
    public function export(){
        return json_encode($this->project);
    }
}
?>