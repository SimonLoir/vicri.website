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

		if (isset($_GET['manager']) && $_GET['manager']  == "true" && (!in_array($_SESSION['user_id'], $this->managers) || !isset($_SESSION['user_id'])) ) {

			return "UError";

		}else{
			if (isset($this->description)) {
				if (!isset($_GET['mod']) || $_GET['mod'] != "true") {
					$this->description = nl2br(htmlspecialchars($this->description));
				}
			}
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

	public function updateDescription($value)
	{
		if ($value == $this->description) {
			return true;
		}else{
			
			if ($this->updateDb("description", $value)) {
				return true;
			}
			$this->error = true;
		}
	}

	public function updateShortDescription($value)
	{
		if ($value == $this->shortDescription) {
			return true;
		}else{
			
			if ($this->updateDb("shortDescription", $value)) {
				return true;
			}
			$this->error = true;
		}
	}

	public function updateGoals($value)
	{
		if ($value == $this->goals) {
			return true;
		}else{
			
			if ($this->updateDb("goals", $value)) {
				return true;
			}
			$this->error = true;
		}
	}

	public function updateLinks($value)
	{
		if ($value == $this->links) {
			return true;
		}else{
			
			if ($this->updateDb("links", $value)) {
				return true;
			}
			$this->error = true;
		}
	}

	public function updateType($value)
	{
		if ($value == $this->type) {
			return true;
		}else{
			$correct_types = ["video", "photo", "code","3d", "jeu"];
			if (!in_array($value, $correct_types)) {
				exit(json_encode("Error : Le type de projet est incorrect"));
			}
			if ($this->updateDb("type", $value)) {
				return true;
			}
			$this->error = true;
		}
	}
	//updateProgression

	public function updateProgression($value)
	{
		if ($value == $this->progression) {
			return true;
		}else{
			if ($value > 100) {
				$value = 100;
			}
			if ($this->updateDb("progression", $value)) {
				return true;
			}
			$this->error = true;
		}
	}

	public function addManager($value)
	{
		if (in_array($value, $this->managers)) {
			exit("User already exists");
		}

		array_push($this->managers, $value);
		
		$final = "";

		for ($i=0; $i < sizeof($this->managers); $i++) { 
			$final .= $this->managers[$i];
			if ($i != sizeof($this->managers) - 1) {
				$final .= ";";
			}
		}
		
		if ($this->updateDb("managers", $final)) {
		
			return true;
		
		}
		
		$this->error = true;
	}


} ?>
