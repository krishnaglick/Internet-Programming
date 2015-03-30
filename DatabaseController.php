<?php
	$GLOBALS['DB'] = new PDO('mysql:host=localhost;dbname=n00728069;charset=utf8', 'n00728069', 'copn00728069');
	$GLOBALS['DB']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$GLOBALS['DB']->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

	function getDB() {
		return $GLOBALS['DB'];
	}

	function getQuery($query) {
		$queries = [
				'register' => "INSERT INTO Users (Username, Password) VALUES (:username, :password)",
				'login' => "SELECT Username FROM Users WHERE Username = :username AND Password = :password",
				'isAdmin' => "SELECT IsAdministrator FROM Users WHERE Username = :username",
				'createTicket' => "INSERT INTO AuthenticationTickets VALUES (:authTicket, NOW())",
				'updateTicket' => "UPDATE AuthenticationTickets SET LastAccessedTime = NOW() WHERE AuthenticationTicket = :authTicket",
				'validateTicket' => "SELECT TIMEDIFF(NOW(), (SELECT LastAccessedTime FROM AuthenticationTickets WHERE AuthenticationTicket = :authTicket))",
				'deleteTicket' => "DELETE FROM AuthenticationTickets WHERE AuthenticationTicket = :authTicket",
				'saveStocks' => "INSERT INTO Stocks VALUES (:username, :stocks)",
				'updateStocks' => "UPDATE Stocks SET Stocks = :stocks WHERE Username = :username",
				'loadStocks' => "SELECT Stocks from Stocks WHERE Username = :username",
				'haveStocks' => "SELECT * FROM Stocks WHERE Username = :username",
				'createRestaurant' => "INSERT INTO Restaurants VALUES (:restaurantID, :restaurantName, :restaurantTypeID, :restaurantEthnicityID, :isApproved)",
				'createRestaurantLocation' => "INSERT INTO RestaurantLocation VALUES (:restaurantLocationID, :restaurantID, :restaurantCity, :restaurantState, :restaurantZip, :restaurantStreetAddress)",
				'createRestaurantRating' => "INSERT INTO RestaurantRatings VALUES (:restaurantLocationID, :username, :menuRating, :enviromentRating, :costRating, :qualityRating, :serviceRating, :comment)",
				'doesRestaurantExist' => "SELECT * FROM Restaurants WHERE RestaurantName = :restaurantName",
				'getRestaurantID' => "SELECT RestaurantID FROM Restaurants WHERE RestaurantName = :restaurantName",
				'userHasRatedRestaurant' => "SELECT * FROM RestaurantRatings WHERE RestaurantLocationID = :restaurantLocationID AND Username = :username",
				'getRestaurantRatings' => "SELECT Enviroment, Cost, Quality, Service FROM Restaurants INNER JOIN RestaurantRatings WHERE RestaurantName = :restaurantName AND Username = :username",
				'getAllResturants' => "SELECT RestaurantName, Avg(Menu), Avg(Enviroment), Avg(Cost), Avg(Quality), Avg(Service) FROM Restaurants INNER JOIN RestaurantRatings ON Restaurants.RestaurantID = RestaurantRatings.RestaurantID;",
				'getRestaurantData' => "SELECT RestaurantName, RestaurantLocationID, RestaurantStreetAddress from Restaurants INNER JOIN RestaurantLocations ON Restaurants.RestaurantID = RestaurantLocations.RestaurantID WHERE IsApproved = 1",
				'getRestaurantEthnicities' => "SELECT RestaurantEthnicityName FROM RestaurantEthnicities",
				'getRestaurantTypes' => "SELECT RestaurantTypeName FROM RestaurantTypes",
				'updateRestaurantRating' => "UPDATE RestaurantRatings SET Menu = :menuRating, Enviroment = :enviromentRating, Cost = :costRating, Quality = :qualityRating, Service = :serviceRating, Comment = :comment WHERE RestaurantLocationID = :restaurantLocationID AND Username = :username",
				'deleteRestaurant' => "DELETE FROM Restaurants WHERE RestaurantName = :restaurantName",
			];
		return $queries[$query];
	}
?>