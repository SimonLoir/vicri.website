<?php 
Class project{
	public function exec()
	{
		$this->managers = explode(';', $this->managers);

		if ($_GET['manager']  == "true" && !in_array($_SESSION['user_id'], $this->managers)) {

			return "UError";

		}else{

			return $this;

		}
	}
} ?>
