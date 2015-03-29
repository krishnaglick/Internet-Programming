<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	include '../DatabaseController.php';
	include '../AuthenticationModule.php';
	
	$_POST = json_decode(file_get_contents("php://input"), true);

	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		if (isset($_POST["ajaxRoute"]) && !empty($_POST["ajaxRoute"])) {
			switch($_POST["ajaxRoute"]) {
				case "rateRestaurant": rateRestaurant(); break;
				case "getRestaurantEthnicities": getRestaurantEthnicities(); break;
				case "getRestaurantTypes": getRestaurantTypes(); break;
				case "getRestaurantRatings": getRestaurantRatings(); break;
				case "getRestaurantNames": getRestaurantNames(); break;
				case "updateRestaurantRating": updateRestaurantRating(); break;
				case "deleteRestaurant": deleteRestaurant(); break;
				default: echo json_encode(["error" => "Bad Route!"]); break;
			}
		}
	}

	function getRestaurantEthnicities() {
		$statement = getDB()->prepare(getQuery("getRestaurantEthnicities"));
		$statement->execute();

		http_response_code(200); //Things are okay
		echo json_encode($statement->fetchAll());
	}

	function getRestaurantTypes() {
		$statement = getDB()->prepare(getQuery("getRestaurantTypes"));
		$statement->execute();

		http_response_code(200); //Things are okay
		echo json_encode($statement->fetchAll());
	}

	function getRestaurantDetails() {
		return [
			name => $_POST["restaurantName"],
			ratings => [
				menu => $_POST["menuRating"],
				enviroment => $_POST["enviromentRating"],
				cost => $_POST["costRating"],
				quality => $_POST["qualityRating"],
				service => $_POST["serviceRating"],
			]
		];
	}

	function userHasRatedRestaurant() {
		$statement = getDB()->prepare(getQuery("userHasRatedRestaurant"));
		$statement->bindParam(':restaurantName', getRestaurantDetails()['name']);
		$statement->bindParam(':username', $_POST["username"]);
		$statement->execute();
		return $statement->rowCount() > 0;
	}

	function updateRestaurantRating() {
		$statement = getDB()->prepare(getQuery("updateRestaurantRating"));
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':restaurantName', getRestaurantDetails()['name']);
		$statement->bindParam(':menuRating', getRestaurantDetails()['menu']);
		$statement->bindParam(':enviromentRating', getRestaurantDetails()['enviroment']);
		$statement->bindParam(':costRating', getRestaurantDetails()['cost']);
		$statement->bindParam(':qualityRating', getRestaurantDetails()['quality']);
		$statement->bindParam(':serviceRating', getRestaurantDetails()['service']);
		$statement->execute();
	}

	function restaurantExists() {
		$statement = getDB()->prepare(getQuery("doesRestaurantExist"));
		$statement->bindParam(':restaurantName', getRestaurantDetails()['name']);
		$statement->execute();
		return $statement->rowCount() > 0;
	}

	function getRestaurantID() {
		$statement = getDB()->prepare(getQuery("getRestaurantID"));
		$statement->bindParam(':restaurantName', getRestaurantDetails()['name']);
		return $statement->fetch();
	}

	function createRestaurant() {
		$statement = getDB()->prepare(getQuery("saveRestaurantName"));
		$statement->bindParam(':restaurantName', getRestaurantDetails()['name']);
		$statement->execute();
		return mysql_insert_id();
	}

	function createRestaurantRating($restaurantID) {
		$statement = getDB()->prepare(getQuery("saveRestaurantRating"));
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':restaurantID', $restaurantID);
		$statement->bindParam(':menuRating', getRestaurantDetails()['menu']);
		$statement->bindParam(':enviromentRating', getRestaurantDetails()['enviroment']);
		$statement->bindParam(':costRating', getRestaurantDetails()['cost']);
		$statement->bindParam(':qualityRating', getRestaurantDetails()['quality']);
		$statement->bindParam(':serviceRating', getRestaurantDetails()['service']);
		$statement->execute();
	}

	function rateRestaurant() {
		if(userHasRatedRestaurant()) {
			updateRestaurantRating();
		}
		else {
			if(restaurantExists()) {
				$restaurantID = getRestaurantID();
			}
			else {
				$restaurantID = createRestaurant();
			}
			createRestaurantRating($restaurantID);
		}
	}

	function getRestaurantNames() {
		$statement = getDB()->prepare(getQuery("getRestaurantNames"));
		$statement->execute();
		echo json_encode($statement->fetchAll());
	}
?>