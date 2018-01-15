<?php 
/*
* ACTION : charge les classes utilisées
*/


Class autoloader{

	static function load($class){

		require 'Class/' . $class . ".php";
	
	}

	static function load_not_root ($class){

		require '../Class/' . $class . ".php";		

	}

}

 ?>