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
				* managers (string) init [semicolon separated values]
				
			POST :
				* error if not manager (verified) 
					  else return project with managers as an array [same numbers] 

		*/

		$this->managers = explode(';', $this->managers);

		if ($_GET['manager']  == "true" && (!in_array($_SESSION['user_id'], $this->managers) || !isset($_SESSION['user_id'])) ) {

			return "UError";

		}else{

			return $this;

		}
	}
} ?>
