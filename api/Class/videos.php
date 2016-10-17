<?php 
Class videos{
	/*
	PRE :
		* id (int)
		* url (string)
		* provider (string)
		* title (string)
		* description (string)
	POST : 
		* id (int)
		=> * url (string)
		* provider (string)
		* title (string)
		* description (string)
	*/
	public function exec(){

		if ($this->provider == 'youtube') {
			$this->url = "https://www.youtube.com/embed/" . $this->url;
			return $this;
		}else{
			$this->url = "";
		}

	}

}?>