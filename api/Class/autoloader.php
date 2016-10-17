<?php 
/*
* ACTION : charge les classes utilisées
*/


Class autoloader{

	static function load($class){

		require 'Class/' . $class . ".php";
	
	}

}

 ?>