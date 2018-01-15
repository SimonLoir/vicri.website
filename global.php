<?php
session_start();
if (!empty($_GET)) {
	$array_keys = array_keys($_GET);
	$query_string_hash = "";
	for ($i=0; $i < sizeof($array_keys); $i++) {
		$query_string_hash .= $array_keys[$i] . "=" . $_GET[$array_keys[$i]];
		if ($i != sizeof($array_keys) -1) {
			$query_string_hash .= ";";
		}
	}
	echo '
	<script>var window_hash = "' .$query_string_hash. '"</script>
	';
}else{
	echo '
	<script>var window_hash = window.location.hash.replace("#", "")</script>
	';
}
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
?>