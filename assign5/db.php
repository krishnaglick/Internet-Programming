<?php
	function getDB() {
		$db = new PDO('mysql:host=localhost;dbname=n00728069;charset=utf8', 'n00728069', 'copn00728069');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		/*$statement = $db->prepare("SELECT User_ID FROM Users WHERE Username=? AND Password=?");
		$statement->bindValue(1, $username);
		$statement->bindValue(2, $password);
		$statement->execute();*/
		return $db;
	}
 ?>