<?php 

/* --- --- --- --- --- --- --- --- --- --- */
/*  => */include "../../config.php"; /* <= */
/* --- --- --- --- --- --- --- --- --- --- */

/*
Initialisation de l'autoloader
*/
include 'Class/autoloader.php';
spl_autoload_register(["autoloader", "load"]);

/*
Création de l'objet db 

	=> la connection à la BDD n'est initialisée QUE si on utilise la méthode ->query

*/
$db = new db($db__base, $db__user , $db__pass, $db__host);



 ?>