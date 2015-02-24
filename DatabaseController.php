<?php
	function getDB() {
		//$db = new PDO('mysql:host=localhost;dbname=n00728069;charset=utf8', 'n00728069', 'copn00728069');
		$db = new PDO('mysql:host=localhost;dbname=n00728069;charset=utf8', 'root', 'root');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		return $db;
	}

	function getQuery($query) {
		$queries = [
				'register' => "INSERT INTO Users (Username, Password) VALUES (:username, :password)",
				'login' => "SELECT * FROM Users WHERE Username = :username AND Password = :password",
				'createTicket' => "INSERT INTO AuthenticationTickets VALUES (:authTicket, NOW())",
				'updateTicket' => "UPDATE AuthenticationTickets SET LastAccessedTime = NOW() WHERE AuthenticationTicket = :authTicket",
				'validateTicket' => "SELECT LastAccessedTime FROM AuthenticationTickets WHERE AuthenticationTicket = :authTicket",
				'deleteTicket' => "DELETE FROM AuthenticationTickets WHERE AuthenticationTicket = :authTicket"
			];

		return $queries[$query];
	}

	function getGUID(){
		mt_srand((double)microtime()*10000);
	    $charid = strtoupper(md5(uniqid(rand(), true)));
	    $hyphen = chr(45);// "-"
	    $uuid = ""
	        .substr($charid, 0, 8).$hyphen
	        .substr($charid, 8, 4).$hyphen
	        .substr($charid,12, 4).$hyphen
	        .substr($charid,16, 4).$hyphen
	        .substr($charid,20,12);
	    return $uuid;
	}
?>