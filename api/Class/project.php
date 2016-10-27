<?php 
Class project{
	/*
	VAR :
		* id (int)
		* name (string)
		* managers (string)
		* type (string)
		* progression (int)
		* pined (int)
		* description (string)
		* shortDescription (string)
		* goals (string)
		* links (string)
	*/
	
	public function clientFormat()
	{
		/*
			PRE :
				* managers (string) init [comma separated numbers]
				
			POST :
				* managers is now an array [same numbers]
				
				output   = "UError" : _GET['manager'] = true and ( _SESSION non init or user_id not in managers )
					else = current project
		*/

		$this->managers = explode(';', $this->managers);

		if ($_GET['manager']  == "true" && (!in_array($_SESSION['user_id'], $this->managers) || !isset($_SESSION['user_id'])) ) {

			return "UError";

		}else{

			return $this;

		}
	}
} ?>
