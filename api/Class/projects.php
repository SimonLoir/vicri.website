<?php 
Class projects{

	public $user_is_manager;

	/*
	PRE :
		* id (int)
		* name (string)
		* managers (string)
		* progression (int)
		* pined (int)
		* shortDescription (string)
	ACTION :
		Transforme this->manager (string) en this->manager (array)
	POST :

		* id (int)
		* name (string)
		=> * managers (array)
		* progression (int)
		* pined (int)
		* shortDescription (string)
		+ user_is_manager (bool)
	*/

	public function exec(){

		$this->managers = explode(';', $this->managers);

		if (in_array($_SESSION['user_id'], $this->managers)) {

			$this->user_is_manager = true;

		}else{

			$this->user_is_manager = false;

		}

		return $this;

	}

}?>
