<?php
class pv_list{

    private $list = [];

    function __construct(){
        
        $this->getPvFrom('../res/documents/PV/', "res/documents/PV/");

    }

    private function getPvFrom($dir, $real_dir){

        $d = scandir($dir);

        foreach($d as $file){

            if($file != "." && $file != ".."){

                array_push($this->list, $real_dir . $file);

            }

        }


    }

    public function export() {
        return json_encode(array_reverse($this->list));
    }
}
?>