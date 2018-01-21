<?php
class project{
    
    private $project;
    
    private $db;

    private $id;

    private $users;

    private $errors;
    
    function __construct($db, $id, $must_be_manager = false) {
        
        $this->db = $db;
        
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

    private function isManager(){
        
        $users_id = explode(";", $this->project->managers);

        if(isset($_SESSION["id"]) && in_array($_SESSION["id"], $users_id)){
            $this->project->isManager = true;
        }else{
            $this->project->isManager = false;            
        }
        
        return $this->project->isManager;
    }

    public function convertManagersIDArrayToNamesArray(){
        
        $users_id = explode(";", $this->project->managers);
        
        $this->project->managers_id = $users_id;
        
        $this->project->managers = $this->users->getUsersNamesFromArray($users_id);
        
    }

    public function update($e){
        
        $keys = ["id","name","progression","description","shortDescription","type","goals","links"];

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

    public function export(){
        return json_encode($this->project);
    }
}
?>