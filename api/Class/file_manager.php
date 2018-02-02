<?php
class file_manager
{

    function __construct()
    {

    }

    /**
     * Uploads an image to the directory
     * @param file the file that has to be uploaded
     * @param path the path of the directory
     * @param rename [default true] specifies if teh file has to be renamed 
     */
    function uploadImage($file, $path, $rename = true)
    {

        if (!isset($_SESSION["id"])) {
            exit("L'upload nécessite d'être connecté");
        }

        $file = $_FILES["file"];
        $filetemp = $file["tmp_name"];
        $filename = $file["name"];
        $filesize = $file["size"];
        $filetype = $file["type"];
        $error = $file["error"];

        if ($error != 0 || !$filetemp) {
            echo "Erreur : can't upload" . $error;
            exit();
        }

        $allowed_extensions = [
            "jpeg",
            "jpg",
            "png",
            "gif"
        ];

        $extension = array_reverse(explode(".", $filename))[0];

        if (strtolower($extension) == "php") {
            exit("LOL, sérieux là ? Un fichier PHP ...");
        }

        if (!in_array(strtolower($extension), $allowed_extensions)) {
            exit("Ce type de fichier n'est pas supporté ..., est-ce une image ?" . $extension . $filename);
        }

        if ($rename) {
            $filename = $_SESSION["id"] . sha1(date("Y-m-d H:i:s:u")) . md5($filename) . "." . $extension;
        }

        if (!is_dir($path)) {
            mkdir($path);
        }

        if (move_uploaded_file($filetemp, $path . $filename)) {
            $this->compressImage($path . $filename);
            exit("file:" . $path . $filename);
        } else {
            exit("Erreur lors de la mise en ligne de l'image sur le serveur");
        }

    }

    private function compressImage($path)
    {
        //ini_set('memory_limit', '-1');

        $infos = getimagesize($path);

        $width = $infos[0];
        $height = $infos[1];

        if ($height > $width) {
            $ratio = 1500 / $height;
        } else {
            $ratio = 1500 / $width;
        }

        $new_width = intval($width * $ratio);
        $new_height = intval($height * $ratio);

        switch ($infos['mime']) {
            case "image/gif":
                $img = imagecreatefromgif($path);
                break;
            case "image/jpeg":
                $img = imagecreatefromjpeg($path);
                break;
            case "image/png":
                $img = imagecreatefrompng($path);
                break;
            default:
                exit('Type error : cant resize');
                break;
        }

        $img_base=imagecreatetruecolor($new_width,$new_height);
        imagecopyresized($img_base,$img,0,0,0,0,$new_width,$new_height,$width,$height);

        imagejpeg($img_base,$path, 90);

        imagedestroy($img_base);
        imagedestroy($img);

    }

}
?>