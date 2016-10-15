<?php 
Class db{

	private $db_name;
	private $db_user;
	private $db_pass;
	private $db_host;
	private $pdo;

	public function __construct($db_name, $db_user = "root", $db_pass = "", $db_host = "localhost"){

		$this->db_name = $db_name;
		$this->db_user = $db_user;
		$this->db_pass = $db_pass;
		$this->db_host = $db_host;

	}

	private function getPDO(){

		if ($this->pdo === null) {
			$pdo = new \PDO('mysql:host='.$this->db_host.';dbname=' . $this->db_name, $this->db_user , $this->db_pass);
			$this->pdo = $pdo;
		}
		return $this->pdo;

	}

	public function query($statement, $class = '___::none'){

		$request = $this->getPDO()->query($statement);
		if ($class == "___::none") {
			$result = $request->fetchAll(PDO::FETCH_OBJ);
		}else{
			$result = $request->fetchAll(PDO::FETCH_CLASS, $class);
		}
		return $result;

	}
}?>
