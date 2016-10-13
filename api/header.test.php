<?php 
//var_dump($_SERVER);
if (isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
	$http_method = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'];
}else{
	$http_method = $_SERVER['REQUEST_METHOD'];
 }

 exit('Methode http : ' . $http_method);?>
