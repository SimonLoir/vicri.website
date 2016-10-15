<?php 

Class autoloader{

	static function load($class){

		require 'Class/' . $class . ".php";
	
	}

}

 ?>