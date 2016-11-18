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
				* "UError" if user not manager (verified) 
					  else return project with managers as an array [same numbers] 

		*/

		$this->managers = explode(';', $this->managers);

		if ($_GET['manager']  == "true" && (!in_array($_SESSION['user_id'], $this->managers) || !isset($_SESSION['user_id'])) ) {

			return "UError";

		}else{

			return $this;

		}
	}

	/* advanced usage */

	private $db;
	public $error = false;

	public function setDb($db_instance){

		$this->db = $db_instance;

	}

	private function getDb(){
		
		return $this->db;
	
	}

	public function updateDb($field, $value)
	{
		$query = $this->getDb()->query('UPDATE projects SET '.$field.' = :value WHERE id = :id', 
			["result" => true, "prepare" => [
				":value" => $value,
				":id" => $this->id
			]]
		);
		return $query;
	}

	public function updateName($value)
	{
		if ($value == $this->name) {
			return true;
		}else{
			
			if ($this->updateDb("name", $value)) {
				return true;
			}
			$this->error = true;
		}
	}

} ?>
