<?php
	include 'db.php';

	$db = getDB();

	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		if (isset($_POST["action"]) && !empty($_POST["action"])) {
			$action = $_POST["action"];
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


	function test_function(){
		$return = $_POST["thing2"];
		//echo $return;
		//Do what you need to do with the info. The following are some examples.
		//if ($return["favorite_beverage"] == ""){
		// $return["favorite_beverage"] = "Coke";
		//}
		//$return["favorite_restaurant"] = "McDonald's";
		//$return["json"] = json_encode($return);
		//echo "potato";
		//echo json_encode($return);
		http_response_code(409); //User exists
		echo json_encode('{"thing" : "lol", "thing2" : "' . $return . '"}');
	}

	function register() {
		$statement = $db->prepare($queries["register"]);
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':password', $_POST["password"]);
		if($statement->execute()) {
			http_response_code(201); //User is created
			//login action
		}
		else {
			http_response_code(409); //User exists
			//failure action
		}
	}

	function login() {
		http_response_code(406); //Bad input data
		http_response_code(200); //Things are okay

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