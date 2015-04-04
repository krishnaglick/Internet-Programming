<?php
	$GLOBALS['DB'] = new PDO('mysql:host=localhost;dbname=n00728069;charset=utf8', 'n00728069', 'copn00728069');
	$GLOBALS['DB']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$GLOBALS['DB']->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

	function getDB() {
		return $GLOBALS['DB'];
	}

	function getQuery($query) {
		$queries = [
				//Authentication
				'register' =>	"INSERT INTO Users (username, password)
								VALUES (:username, :password)",

				'login' => 		"SELECT username
								FROM Users
								WHERE username = :username
								AND password = :password",

				'isAdmin' => 	"SELECT isAdministrator
								FROM Users
								WHERE username = :username",

				'createTicket' => 	"INSERT INTO AuthenticationTickets
									VALUES (:authTicket, NOW(), :isAdmin)",

				'updateTicket' => 	"UPDATE AuthenticationTickets
									SET lastAccessedTime = NOW()
									WHERE authenticationTicket = :authTicket",

				'validateTicket' => "SELECT TIMEDIFF
									(
										NOW(),
										(
											SELECT lastAccessedTime
											FROM AuthenticationTickets
											WHERE authenticationTicket = :authTicket
										)
									)",

				'deleteTicket' => 	"DELETE FROM AuthenticationTickets
									WHERE authenticationTicket = :authTicket",

				//Stocks
				'saveStocks' => 	"INSERT INTO Stocks
									VALUES (:username, :stocks)",

				'updateStocks' => 	"UPDATE Stocks
									SET stocks = :stocks
									WHERE username = :username",

				'loadStocks' => 	"SELECT Stocks
									FROM Stocks
									WHERE username = :username",

				'haveStocks' => 	"SELECT *
									FROM Stocks
									WHERE username = :username",

				//MEEQS Queries
				'createRestaurant' =>
									"INSERT INTO Restaurants
									VALUES
									(
										:restaurantID,
										:restaurantName,
										:restaurantTypeID,
										:restaurantEthnicityID,
										:isApproved
									)",

				'createRestaurantLocation' =>
									"INSERT INTO RestaurantLocations
									VALUES
									(
										:restaurantLocationID,
										:restaurantID,
										:restaurantCity,
										:restaurantState,
										:restaurantZip,
										:restaurantStreetAddress
									)",

				'createRestaurantRating' =>
									"INSERT INTO RestaurantRatings
									VALUES
									(
										:restaurantLocationID,
										:username,
										:menuRating,
										:environmentRating,
										:costRating,
										:qualityRating,
										:serviceRating,
										:comment
									)",

				'doesRestaurantExist' =>
									"SELECT *
									FROM Restaurants
									WHERE restaurantName = :restaurantName",
				'getRestaurantID' =>
									"SELECT restaurantID
									FROM Restaurants
									WHERE restaurantName = :restaurantName",

				'userHasRatedRestaurant' =>
									"SELECT *
									FROM RestaurantRatings
									WHERE restaurantLocationID = :restaurantLocationID
									AND username = :username",

				'getRestaurantRatings' =>
									"SELECT
										environmentRating,
										costRating,
										qualityRating,
										serviceRating
									FROM Restaurants
									INNER JOIN RestaurantRatings
									WHERE restaurantName = :restaurantName
									AND username = :username",

				'getRestaurantData' =>
									"SELECT
										restaurantName,
										restaurantLocationID,
										restaurantStreetAddress,
										restaurantTypeID,
										restaurantEthnicityID
									FROM Restaurants
									INNER JOIN RestaurantLocations
										ON Restaurants.restaurantID = RestaurantLocations.restaurantID
									WHERE isApproved = 1",

				'getRestaurantEthnicities' =>
									"SELECT *
									FROM RestaurantEthnicities",
				'getRestaurantTypes' =>
									"SELECT *
									FROM RestaurantTypes",

				'getUserRestaurantRating' =>
									"SELECT
										menuRating,
										environmentRating,
										costRating,
										qualityRating,
										serviceRating,
										comment
									FROM RestaurantRatings
									WHERE username = :username
									AND restaurantLocationID = :restaurantLocationID",

				'updateRestaurantRating' =>
									"UPDATE RestaurantRatings
									SET
										menuRating = :menuRating,
										environmentRating = :environmentRating,
										costRating = :costRating,
										qualityRating = :qualityRating,
										serviceRating = :serviceRating,
										comment = :comment
									WHERE restaurantLocationID = :restaurantLocationID
									AND username = :username",

				'deleteRestaurant' =>
									"DELETE FROM Restaurants
									WHERE restaurantName = :restaurantName",
			];
		return $queries[$query];
	}
	//'getAllResturants' => "SELECT RestaurantName, Avg(menuRating), Avg(environmentRating), Avg(costRating), Avg(qualityRating), Avg(serviceRating) FROM Restaurants INNER JOIN RestaurantRatings ON Restaurants.RestaurantID = RestaurantRatings.RestaurantID;",
?>