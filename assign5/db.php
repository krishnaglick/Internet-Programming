<?php
	function getDB() {
		//$db = new PDO('mysql:host=localhost;dbname=n00728069;charset=utf8', 'n00728069', 'copn00728069');
		$db = new PDO('mysql:host=localhost;dbname=n00728069;charset=utf8', 'root', 'root');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		return $db;
	}

	$queries = [
			'register' => "INSERT INTO users (Username, Password) VALUES (:username, :password)",
			'login' => "SELECT * FROM users WHERE Username = :username AND Password = :password",
			'createTicket' => "INSERT INTO authenticationtickets VALUES (:authTicket)",
			'updateTicket' => "UPDATE authenticationtickets SET LastAccessedTime = NOW() WHERE AuthenticationTicket = :authTicket"
		];
 ?>