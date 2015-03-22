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
				'login' => "SELECT * FROM Users WHERE Username = :username AND Password = :password",
				'createTicket' => "INSERT INTO AuthenticationTickets VALUES (:authTicket, NOW())",
				'updateTicket' => "UPDATE AuthenticationTickets SET LastAccessedTime = NOW() WHERE AuthenticationTicket = :authTicket",
				'validateTicket' => "SELECT TIMEDIFF(NOW(), (SELECT LastAccessedTime FROM AuthenticationTickets WHERE AuthenticationTicket = :authTicket))",
				'deleteTicket' => "DELETE FROM AuthenticationTickets WHERE AuthenticationTicket = :authTicket",
				'saveStocks' => "INSERT INTO Stocks VALUES (:username, :stocks)",
				'updateStocks' => "UPDATE Stocks SET Stocks = :stocks WHERE Username = :username",
				'loadStocks' => "SELECT Stocks from Stocks WHERE Username = :username",
				'haveStocks' => "SELECT * FROM Stocks WHERE Username = :username",
				'saveRestaurantName' => "INSERT INTO Restaurants VALUES (:restaurantName)",
				'saveRestaurantRating' => "INSERT INTO RestaurantRatings VALUES (:restaurantID, :username, :menuRating, :enviromentRating, :costRating, :qualityRating, :serviceRating)",
				'userHasRatedRestaurant' => "SELECT * FROM Restaurants WHERE RestaurantID = (SELECT RestaurantID FROM Restaurants WHERE RestaurantName = :restaurantName) AND Username = :username",
				'getRestaurantRatings' => "SELECT Enviroment, Cost, Quality, Service FROM Restaurants INNER JOIN RestaurantRatings WHERE RestaurantName = :restaurantName AND Username = :username",
				'getAllResturants' => "SELECT RestaurantName, Avg(Menu), Avg(Enviroment), Avg(Cost), Avg(Quality), Avg(Service) FROM Restaurants INNER JOIN RestaurantRatings ON Restaurants.RestaurantID = RestaurantRatings.RestaurantID;",
				'updateRestaurantRating' => "UPDATE RestaurantRatings SET Menu = :menuRating, Enviroment = :enviromentRating, Cost = :costRating, Quality = :qualityRating, Service = :serviceRating WHERE RestaurantID = (SELECT RestaurantID FROM Restaurants WHERE RestaurantName = :restaurantName) AND Username = :username",
				'deleteRestaurant' => "DELETE FROM Restaurants WHERE RestaurantName = :restaurantName"
			];

		return $queries[$query];
	}
?>