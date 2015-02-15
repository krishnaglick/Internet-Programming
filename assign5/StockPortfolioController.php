<?php
	include 'db.php';

	$db = getDB();

	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		if (isset($_POST["action"]) && !empty($_POST["action"])) {
			$action = $_POST["ajaxRoute"];
			switch($action) {
				case "register": register(); break;
				case "login": login(); break;
				case "logout": logout(); break;
				case "saveStocks": saveStocks(); break;
				case "loadStocks": loadStocks(); break;
				case "test": test_function(); break;
				default: echo "Bad Action!"; break;
			}
		}
	}

	function test_function() {
		http_response_code(500); //DB error
		echo json_encode($_POST);
	}

	function generateAuthToken() {
		$guid = com_create_guid();
		$statement = $db->prepare($queries["createGuid"]);
		$statement->bindParam(':authTicket', $guid);
		if($statement->execute()) {
			http_response_code(200); //Things are okay
			return [guid => $guid];
		}
		else {
			http_response_code(500); //DB Error
			return [error => "Oops! There was an error communicating with the database."];
		}
	}

	function register() {
		$statement = $db->prepare($queries["register"]);
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':password', $_POST["password"]);

		if($statement->execute()) {
			echo json_encode(generateAuthToken());
			http_response_code(201); //User is created
		}
		else {
			//failure action
			http_response_code(409); //User exists
		}
	}

	function login() {
		$statement = $db->prepare($queries["login"]);
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':password', $_POST["password"]);

		if($statement->execute()) {
			http_response_code(200); //Things are okay
			echo json_encode(generateAuthToken());
		}
		else {
			http_response_code(406); //Bad input data
			echo "";
		}
	}

	function logout() {
		http_response_code(200); //Things are okay
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