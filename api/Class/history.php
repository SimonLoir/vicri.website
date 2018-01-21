<?php
class history{

    private $db;

    private $history;

    private $users;

    /**
     * Creates a new instance of the history object and gets the history of the project
     * @param db the database to use
     * @param id the id of the project (-1 for global)
     */
    function __construct($db, $id) {

        $this->db = $db;

        $this->history = $this->db->query('SELECT * FROM history WHERE project_id = :id ORDER BY id DESC LIMIT 25', [
            "prepare" => [
                ":id" => $id
            ]
        ]);

        $this->users = new users_array($this->db);

        $this->contentStringToArray();

    }
    /**
     * Converts the content field (json) into an array
     */
    public function contentStringToArray(){
        
        foreach ($this->history as $key => $entry) {
            
            $content = $entry->content;

            $content = preg_replace_callback('|(\$\{([a-z1-9\.]+)\})|', function($match) {
                
                $m = explode('.', $match[2]);

                if($m[0] == 'user'){
                    
                    return $this->users->getUserNameFromID($m[1]);

                }

                return $match[0];

            }, $content);

            $this->history[$key]->content = json_decode($content);

        }

    }
    /**
     * Exports the history to json
     */
    public function export(){

        return json_encode($this->history);
    
    }
}
?>