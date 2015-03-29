<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	include 'DatabaseController.php';
	include 'AuthenticationModule.php';

	$_POST = json_decode(file_get_contents("php://input"), true);

	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		if (isset($_POST["ajaxRoute"]) && !empty($_POST["ajaxRoute"])) {
			switch($_POST["ajaxRoute"]) {
				case "register": register(); break;
				case "login": login(); break;
				case "logout": logout(); break;
				default: echo json_encode(["error" => "Bad Route!"]); break;
			}
		}
	}

	function isUserInDatabase() {
		$statement = getDB()->prepare(getQuery("login"));
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':password', $_POST["password"]);
		$statement->execute();
		return $statement->rowCount();
	}

	function register() {
		if(isUserInDatabase() > 0) {
			http_response_code(409); //User exists
			Exit();
		}
		$statement = getDB()->prepare(getQuery("register"));
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':password', $_POST["password"]);
		$statement->execute();

		http_response_code(201); //User is created
		$userInformation = generateAuthTicket() + isUserAdministrator();
		echo json_encode($userInformation);
	}

	function login() {
		if(isUserInDatabase() > 0) {
			http_response_code(200); //Things are okay
			$userInformation = generateAuthTicket() + isUserAdministrator();
			echo json_encode($userInformation);
		}
		else {
			http_response_code(406); //Bad input data
		}
	}

	function logout() {
		deleteAuthTicket($_POST["authTicket"]);
		http_response_code(200); //Things are okay
		echo json_encode('');
	}
?>