<?php 
Class projects{
/*	VAR :
		* id (int)
		* name (string)
		* managers (string)
		* progression (int)
		* pined (int)
		* shortDescription (string)
		*¨user_is_manager (bool)
*/
	public $user_is_manager;

	
	public function clientFormat(){
		/*
	PRE :
	    * managers (string) init [comma separated numbers]

	ACTION :
		Transforme this->manager (string) en this->manager (array)
	POST : 
		* managers is now an array [same numbers]
		+ user_is_manager    = False : _SESSION non init or user_id not in managers
						else = True  
	*/


		$this->managers = explode(';', $this->managers);

		if (isset($_SESSION['user_id']) && in_array($_SESSION['user_id'], $this->managers)) {

			$this->user_is_manager = true;

		}else{

			$this->user_is_manager = false;

		}

		return $this;

	}

}?>
