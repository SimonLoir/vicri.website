<?php
class photo_list{
    
    private $photos;
    
    private $db;
    /**
     * Sets the list of photos
     * @param photos The list of photos
     */
    private function setPhotos($photos){
        $this->photos = $photos;
    }
    /**
     * Creates a new photo_list instance
     * @param db the database that we need to use
     */
    function __construct($db) {
        $this->db = $db;
    }
    /**
     * Gets all the photos that are stored in the database
     */
    public function getAll(){
        $this->setPhotos($this->db->query('SELECT * FROM photos_folders ORDER BY id DESC'));
    }
    /**
     * Exports the photo as a json string
     */
    public function export() {
        return json_encode(array_values($this->photos));
    }
}
?>