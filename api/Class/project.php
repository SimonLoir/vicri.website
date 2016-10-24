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
				IF ?manager = "true" AND user_id isn't in managers : return "UError"
		*/

		$this->managers = explode(';', $this->managers);

		if ($_GET['manager']  == "true" && !in_array($_SESSION['user_id'], $this->managers)) {

			return "UError";

		}else{

			return $this;

		}
	}
} ?>
