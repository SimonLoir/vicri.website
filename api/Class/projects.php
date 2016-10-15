<?php 
Class projects{

	public $user_is_manager;

	public function exec(){

		$this->managers = explode(';', $this->managers);

		if (in_array($_SESSION['user_id'], $this->managers)) {

			$this->user_is_manager = true;

		}else{

			$this->user_is_manager = false;
			
		}

		return $this;

	}

}?>
