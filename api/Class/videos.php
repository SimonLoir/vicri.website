<?php 
Class videos{

	public function exec(){

		if ($this->provider == 'youtube') {
			$this->url = "https://www.youtube.com/embed/" . $this->url;
			return $this;
		}else{
			$this->url = "";
		}

	}

}?>