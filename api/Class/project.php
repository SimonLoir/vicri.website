<?php 
Class project{
	/*
	PRE :
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

	POST :

		* id (int)
		* name (string)
		=> * managers (array)
		* type (string)
		* progression (int)
		* pined (int)
		* description (string)
		* shortDescription (string)
		* goals (string)
		* links (string)

		|| UError (user error)
	*/
	public function clientFormat()
	{
		$this->managers = explode(';', $this->managers);

		if ($_GET['manager']  == "true" && !in_array($_SESSION['user_id'], $this->managers)) {

			return "UError";

		}else{

			return $this;

		}
	}
} ?>
