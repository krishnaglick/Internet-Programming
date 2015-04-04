<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	include '../DatabaseController.php';
	include '../AuthenticationModule.php';
	
	$_POST = json_decode(file_get_contents("php://input"), true);

	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
		if (isset($_POST["ajaxRoute"]) && !empty($_POST["ajaxRoute"])) {
			switch($_POST["ajaxRoute"]) {
				case "createRestaurant": createRestaurant(); break;
				case "rateRestaurant": rateRestaurant(); break;
				case "getRestaurantEthnicities": getRestaurantEthnicities(); break;
				case "getRestaurantTypes": getRestaurantTypes(); break;
				case "getAverageRestaurantRatings": getAverageRestaurantRatings(); break;
				case "getRestaurants": getRestaurants(); break;
				case "getPreviousUserRating": getPreviousUserRating(); break;
				case "loadAdminList": loadAdminList(); break;
				case "deleteRestaurantLocation": deleteRestaurantLocation(); break;
				case "approveRestaurant": approveRestaurant(); break;
				case "updateRestaurantRating": updateRestaurantRating(); break;
				case "deleteRestaurant": deleteRestaurant(); break;
				default: http_response_code(404); echo json_encode(["error" => "Bad Route!"]); break;
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
			echo json_encode('No Rating Found');
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

	function restaurantExists($restaurantData) {
		$statement = getDB()->prepare(getQuery("doesRestaurantExist"));
		$statement->bindParam(':restaurantName', $restaurantData['name']);
		$statement->execute();
		return $statement->rowCount() > 0;
	}

	function getRestaurantID($restaurantName) {
		$statement = getDB()->prepare(getQuery("getRestaurantID"));
		$statement->bindParam(':restaurantName', $restaurantName);
		$statement->execute();
		return $statement->fetch()['restaurantID'];
	}

	function createRestaurant() {
		$restaurantData = [
			'name' => $_POST['newRestaurantData']['restaurantName'],
			'typeID' => $_POST['newRestaurantTypeID'],
			'ethnicityID' => $_POST['newRestaurantEthnicityID'],
			'city' => $_POST['newRestaurantData']['restaurantCity'],
			'state' => $_POST['newRestaurantData']['restaurantState'],
			'zip' => $_POST['newRestaurantData']['restaurantZip'],
			'street' => $_POST['newRestaurantData']['restaurantStreetAddress'],
		];

		if(!restaurantExists($restaurantData)) {
			$statement = getDB()->prepare(getQuery("createRestaurant"));
			$restaurantID = generateGUID();
			$statement->bindParam(':restaurantID', $restaurantID);
			$statement->bindParam(':restaurantName', $restaurantData['name']);
			$statement->bindParam(':restaurantTypeID', $restaurantData['typeID']);
			$statement->bindParam(':restaurantEthnicityID', $restaurantData['ethnicityID']);
			if(isUserAdministrator()) {
				$statement->bindValue(':isApproved', 1);
			}
			else {
				$statement->bindValue(':isApproved', 0);
			}
			$statement->execute();
			echo json_encode(['restaurantLocationID' => 
				createRestaurantLocation($restaurantID, $restaurantData)]);
			http_response_code(201);
		}
		else {
			$restaurantID = getRestaurantID($restaurantData['name']);
			echo json_encode(['restaurantLocationID' => 
				createRestaurantLocation($restaurantID, $restaurantData)]);
		}
	}

	function createRestaurantLocation($restaurantID, $restaurantData) {
		$statement = getDB()->prepare(getQuery("createRestaurantLocation"));
		$restaurantLocationID = generateGUID();
		$statement->bindParam(':restaurantLocationID', $restaurantLocationID);
		$statement->bindParam(':restaurantID', $restaurantID);
		$statement->bindParam(':restaurantCity', $restaurantData['city']);
		$statement->bindParam(':restaurantState', $restaurantData['state']);
		$statement->bindParam(':restaurantZip', $restaurantData['zip']);
		$statement->bindParam(':restaurantStreetAddress', $restaurantData['street']);
		$statement->execute();
		return $restaurantLocationID;
	}

	function createRestaurantRating() {
		$statement = getDB()->prepare(getQuery("createRestaurantRating"));
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':restaurantLocationID', $_POST["restaurantLocationID"]);
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
			createRestaurantRating();
			http_response_code(201); //Things are created
			echo json_encode(['result' => 'success']);
		}
	}

	function getAverageRestaurantRatings() {
		$statement = getDB()->prepare(getQuery("getAverageRestaurantRatings"));
		$statement->execute();
		echo json_encode($statement->fetchAll());
	}

	function loadAdminList() {
		if(isUserAdministrator()) {
			$statement = getDB()->prepare(getQuery("loadAdminList"));
			$statement->execute();
			http_response_code(200); //Things are okay
			echo json_encode($statement->fetchAll());
		}
	}

	function approveRestaurant() {
		if(isUserAdministrator()) {
			$statement = getDB()->prepare(getQuery("approveRestaurant"));
			$statement->bindParam(':restaurantName', $_POST['restaurantName']);
			$statement->execute();
			http_response_code(200); //Okay
			echo json_encode('Success');
		}
	}

	function restaurantLocationCount($restaurantName) {
		$statement = getDB()->prepare(getQuery("restaurantLocationCount"));
		$statement->bindParam(':restaurantName', $_POST['restaurantName']);
		$statement->execute();
		return $statement->rowCount();
	}

	function deleteRestaurant($restaurantName) {
		$statement = getDB()->prepare(getQuery("deleteRestaurant"));
		$statement->bindParam(':restaurantName', $_POST['restaurantName']);
		$statement->execute();
		echo json_encode('Success');
		http_response_code(200);
	}

	function deleteRestaurantLocation() {
		if(isUserAdministrator()) {
			if(restaurantLocationCount($_POST['restaurantName']) > 1) {
				$statement = getDB()->prepare(getQuery("deleteRestaurantLocation"));
				$statement->bindParam(':restaurantStreetAddress', $_POST['restaurantStreetAddress']);
				$statement->execute();
				echo json_encode('Success');
				http_response_code(200);
			}
			else {
				deleteRestaurant($_POST['restaurantName']);
			}
		}
	}
?>