<?php
class event_list {
    
    private $db;

    private $ids;

    /**
     * Creates a new event_list instance
     * @param db the database that we need to use
     */
    function __construct($db, $pid) {
        $this->db = $db;
        $this->ids = $pid;
    }

    public function getEvents(){

        $base = "SELECT * FROM events";
        $end = " WHERE date > NOW() AND (";

        foreach($this->ids as $id){
            $end .= "project_id = " . $id . " OR ";
        }

        $end .= " project_id = -1) ORDER BY date ASC";

        return $this->db->query($base . $end);

    }
}
?>