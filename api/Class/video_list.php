<?php
class video_list{
    
    private $videos;
    
    private $db;
    /**
     * Sets the list of videos
     * @param videos The list of videos
     */
    private function setVideos($videos){
        $this->videos = $videos;
    }
    /**
     * Creates a new video_list instance
     * @param db the database that we need to use
     */
    function __construct($db) {
        $this->db = $db;
    }
    /**
     * Gets all the videos that are stored in the database
     */
    public function getAll(){
        $this->setVideos($this->db->query('SELECT * FROM videos ORDER BY id DESC'));
    }
    /**
     * Exports the video as a json string
     */
    public function export() {
        return json_encode(array_values($this->videos));
    }
}
?>