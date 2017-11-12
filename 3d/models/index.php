<h1>Projets 3D</h1>
<?php
    $projects = scandir('.');
    foreach($projects as $project){
        if($project != "." && $project != ".." && is_dir($project)){
            $files = scandir($project);
            $model = "/";
            foreach ($files as $file) {
                if(strpos($file, ".dae")){
                    $model = $file;
                }
            }
            ?>
                <a href="../?model=models/<?= $project  . "/" . $model ?>"><?= $model ?></a>
            <?php
        }
    }
?>