<?php 
/**
 * This is an autoloader which means that is main goal is to load object without having to laod the files manually.
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