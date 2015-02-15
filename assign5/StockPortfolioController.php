<?php
	include '../DatabaseController.php';
	
	$_POST = json_decode(file_get_contents("php://input"), true);

	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		if (isset($_POST["ajaxRoute"]) && !empty($_POST["ajaxRoute"])) {
			switch($_POST["ajaxRoute"]) {
				case "saveStocks": saveStocks(); break;
				case "loadStocks": loadStocks(); break;
				default: echo json_encode(["error" => "Bad Route!"]); break;
			}
		}
	}

	function saveStocks() {
		http_response_code(401); //Unauthorized
		http_response_code(200); //Things are okay
	}

	function loadStocks() {
		http_response_code(401); //Unauthorized
		http_response_code(200); //Things are okay
	}
?> 