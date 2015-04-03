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
				case "getRestaurants": getRestaurants(); break;
				case "getPreviousUserRating": getPreviousUserRating(); break;
				case "updateRestaurantRating": updateRestaurantRating(); break;
				case "deleteRestaurant": deleteRestaurant(); break;
				default: echo json_encode(["error" => "Bad Route!"]); break;
			}
		}
	}

	function getRestaurants() {
		$statement = getDB()->prepare(getQuery("getRestaurantData"));
		$statement->execute();
		echo json_encode($statement->fetchAll());
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

	function getPreviousUserRating() {
		if(userHasRatedRestaurant()) {
			$statement = getDB()->prepare(getQuery("getUserRestaurantRating"));
			$statement->bindParam(':restaurantLocationID', $_POST['restaurantLocationID']);
			$statement->bindParam(':username', $_POST["username"]);
			$statement->execute();
			http_response_code(200); //Things are okay
			echo json_encode($statement->fetch());
		}
		else {
			http_response_code(404); //Not Found
		}
	}

	function userHasRatedRestaurant() {
		$statement = getDB()->prepare(getQuery("userHasRatedRestaurant"));
		$statement->bindParam(':restaurantLocationID', $_POST['restaurantLocationID']);
		$statement->bindParam(':username', $_POST["username"]);
		$statement->execute();
		return $statement->rowCount() > 0;
	}

	function updateRestaurantRating() {
		$statement = getDB()->prepare(getQuery("updateRestaurantRating"));
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':restaurantLocationID', $_POST['restaurantLocationID']);
		$statement->bindParam(':menuRating', $_POST['menuRating']);
		$statement->bindParam(':environmentRating', $_POST['environmentRating']);
		$statement->bindParam(':costRating', $_POST['costRating']);
		$statement->bindParam(':qualityRating', $_POST['qualityRating']);
		$statement->bindParam(':serviceRating', $_POST['serviceRating']);
		$statement->bindParam(':comment', $_POST['comment']);
		$statement->execute();
	}

	function restaurantExists() {
		$statement = getDB()->prepare(getQuery("doesRestaurantExist"));
		$statement->bindParam(':restaurantName', $_POST['restaurantName']);
		$statement->execute();
		return $statement->rowCount() > 0;
	}

	function getRestaurantID() {
		$statement = getDB()->prepare(getQuery("getRestaurantID"));
		$statement->bindParam(':restaurantName', $_POST['restaurantName']);
		return $statement->fetch();
	}

	function createRestaurant() {
		$statement = getDB()->prepare(getQuery("createRestaurant"));
		$guid = generateGUID();
		$statement->bindParam(':restaurantID', $guid);
		$statement->bindParam(':restaurantName', $_POST['restaurantName']);
		$statement->bindParam(':restaurantTypeID', $_POST['restaurantTypeID']);
		echo json_encode($_POST);
		$statement->bindParam(':restaurantEthnicityID', $_POST['restaurantEthnicityID']);
		if(isUserAdministrator()) {
			$statement->bindValue(':isApproved', 1);
		}
		else {
			$statement->bindValue(':isApproved', 0);
		}
		$statement->execute();
		return $guid;
	}

	function createRestaurantLocation($restaurantID) {
		$statement = getDB()->prepare(getQuery("createRestaurantLocation"));
		$guid = generateGUID();
		$statement->bindParam(':restaurantLocationID', $guid);
		$statement->bindParam(':restaurantID', $restaurantID);
		$statement->bindParam(':restaurantID', $_POST['restaurantCity']);
		$statement->bindParam(':restaurantID', $_POST['restaurantState']);
		$statement->bindParam(':restaurantID', $_POST['restaurantZip']);
		$statement->bindParam(':restaurantID', $_POST['restaurantStreetAddress']);
		$statement->execute();
		return $guid;
	}

	function createRestaurantRating($restaurantLocationID) {
		$statement = getDB()->prepare(getQuery("createRestaurantRating"));
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':restaurantLocationID', $restaurantLocationID);
		$statement->bindParam(':menuRating', $_POST['menuRating']);
		$statement->bindParam(':environmentRating', $_POST['environmentRating']);
		$statement->bindParam(':costRating', $_POST['costRating']);
		$statement->bindParam(':qualityRating', $_POST['qualityRating']);
		$statement->bindParam(':serviceRating', $_POST['serviceRating']);
		$statement->bindParam(':comment', $_POST['comment']);
		$statement->execute();
	}

	function rateRestaurant() {
		if(userHasRatedRestaurant()) {
			updateRestaurantRating();
			echo json_encode(['result' => 'Success']);
		}
		else {
			if(restaurantExists()) {
				$restaurantID = getRestaurantID();
			}
			else {
				$restaurantID = createRestaurant();
			}
			createRestaurantRating(createRestaurantLocation($restaurantID));
			http_response_code(201); //Things are created
			echo json_encode([result => 'success']);
		}
	}
?>