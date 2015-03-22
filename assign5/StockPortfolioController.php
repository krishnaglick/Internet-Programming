<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	include '../DatabaseController.php';
	include '../AuthenticationModule.php';
	
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

	function userHasStocks() {
		$statement = getDB()->prepare(getQuery("haveStocks"));
		$statement->bindParam(':username', $_POST["username"]);
		$statement->execute();
		if($statement->rowCount() > 0) {
			return true;
		}
		else {
			return false;
		}
	}

	function saveStocks() {
		if(validAuthTicket($_POST["authTicket"])) {
			if(userHasStocks()) {
				$statement = getDB()->prepare(getQuery("updateStocks"));
				$_POST["stockData"] = json_encode($_POST["stockData"]);
				$statement->bindParam(':stocks', $_POST["stockData"]);
				$statement->bindParam(':username', $_POST["username"]);
				$statement->execute();
				http_response_code(200); //Things are okay
				echo json_encode($statement->rowCount());
			}
			else {
				$statement = getDB()->prepare(getQuery("saveStocks"));
				$_POST["stockData"] = json_encode($_POST["stockData"]);
				$statement->bindParam(':stocks', $_POST["stockData"]);
				$statement->bindParam(':username', $_POST["username"]);
				$statement->execute();
				http_response_code(201); //Things are created
				echo json_encode($statement->rowCount());
			}
			updateAuthTicket();
		}
		else {
			http_response_code(401); //Unauthorized
		}
	}

	function loadStocks() {
		if(validAuthTicket($_POST["authTicket"])) {
			if(userHasStocks()) {
				$statement = getDB()->prepare(getQuery("loadStocks"));
				$statement->bindParam(':username', $_POST["username"]);
				$statement->execute();

				http_response_code(200); //Things are okay
				echo json_encode($statement->fetch()[0]);
			}
			else
			{
				http_response_code(404); //Not Found
			}
		}
		else {
			http_response_code(401); //Unauthorized
		}
	}
?>