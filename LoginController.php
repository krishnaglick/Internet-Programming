<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	include 'DatabaseController.php';

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

	function generateAuthToken() {
		$guid = getGUID();
		$statement = getDB()->prepare(getQuery("createTicket"));
		$statement->bindParam(':authTicket', $guid);
		if($statement->execute()) {
			return ['authTicket' => $guid];
		}
		else {
			http_response_code(500); //DB Error
			Exit();
		}
	}

	function register() {
		if(isUserInDatabase() > 0) {
			http_response_code(409); //User exists
		}
		$statement = getDB()->prepare(getQuery("register"));
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':password', $_POST["password"]);
		$statement->execute();

		http_response_code(201); //User is created
		echo json_encode(generateAuthToken());
	}

	function isUserInDatabase() {
		$statement = getDB()->prepare(getQuery("login"));
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':password', $_POST["password"]);
		$statement->execute();
		return $statement->rowCount();
	}

	function login() {
		if(isUserInDatabase() > 0) {
			http_response_code(200); //Things are okay
			echo json_encode(generateAuthToken());
		}
		else {
			http_response_code(406); //Bad input data
		}
	}

	function logout() {
		$statement = getDB()->prepare(getQuery("deleteTicket"));
		$statement->bindParam(':authTicket', $_POST["authTicket"]);
		$statement->execute();
		http_response_code(200); //Things are okay
	}
?>