<?php 
Class db{

	private $db_name;
	private $db_user;
	private $db_pass;
	private $db_host;
	private $pdo;

	/*
	PRÉ : 
		$db_name : nom de la base de données (obligatoire)
		$db_user : nom de l'utilisateur de la BDD (donner si != "root")
		$db_pass : mdp de l'utilisateur (donner si != "")
		$db_host : hôte mysql
	ACTION :
		Assigne les valeurs aux propriétés
	*/

	public function __construct($db_name, $db_user = "root", $db_pass = "", $db_host = "localhost"){

		$this->db_name = $db_name;
		$this->db_user = $db_user;
		$this->db_pass = $db_pass;
		$this->db_host = $db_host;

	}

	/*
	PRE : /
	POST :
		+ 
	*/

	private function getPDO(){

		if ($this->pdo === null) {
			$pdo = new \PDO('mysql:host='.$this->db_host.';dbname=' . $this->db_name, $this->db_user , $this->db_pass);
			$this->pdo = $pdo;
		}
		return $this->pdo;

	}

	/*
	PRE : 
		statement [SQL statement] (string)

	POST :
		output  =  object made with class : return = false and class not empty (or "none") 
		   else =  array : return = false and class is empty (or "none")
		   else =  statement : return = true and request didn't fail
		   else =  FALSE : return = true and request failed
	*/

	public function query($statement, $class = 'none', $return = false){

		$request = $this->getPDO()->query($statement);
		
		if ($return == true) {
			
			return $request;

		}

		if ($class == "none") {
			$result = $request->fetchAll(PDO::FETCH_OBJ);
		}else{
			$result = $request->fetchAll(PDO::FETCH_CLASS, $class);
		}

		return $result;

	}

	function newquery($statement, $options = ["obj" => false, "prepare" => false]){
		 


	}

}?>
