<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	function isUserAdministrator() {
		$statement = getDB()->prepare(getQuery("isAdmin"));
		$statement->bindParam(':username', $_POST["username"]);
		$statement->bindParam(':password', $_POST["password"]);
		$statement->execute();
		if($statement->fetch()['IsAdministrator'] == 1) {
			return ['isAdministrator' => true];
		}
		else {
			return ['isAdministrator' => false];
		}
	}

	function updateAuthTicket($authTicket) {
		$statement = getDB()->prepare(getQuery("updateTicket"));
		$statement->bindParam(':authTicket', $authTicket);
		$statement->execute();
	}

	function generateAuthTicket() {
		$guid = generateGUID();
		$statement = getDB()->prepare(getQuery("createTicket"));
		$statement->bindParam(':authTicket', $guid);
		if($statement->execute()) {
			return ['authTicket' => $guid];
		}
		else {
			http_response_code(500); //DB Error
			Exit();
		}
	}

	function validAuthTicket($authTicket) {
		$statement = getDB()->prepare(getQuery("validateTicket"));
		$statement->bindParam(':authTicket', $authTicket);
		$statement->execute();
		if($statement->rowCount() == 1) {
			$dateDiffResult = $statement->fetch()[0];
			$dateDiffVals = explode(":", $dateDiffResult);
			if($dateDiffVals[0] == 0 && $dateDiffVals[1] < 15) {
				return true;
			}
			else {
				return false;
			}
		}
	}

	function deleteAuthTicket($authTicket) {
		$statement = getDB()->prepare(getQuery("deleteTicket"));
		$statement->bindParam(':authTicket', $authTicket);
		$statement->execute();
	}

	function generateGUID(){
		mt_srand((double)microtime()*10000);
	    $charid = strtoupper(md5(uniqid(rand(), true)));
	    $hyphen = chr(45);
	    $uuid = ""
	        .substr($charid, 0, 8).$hyphen
	        .substr($charid, 8, 4).$hyphen
	        .substr($charid,12, 4).$hyphen
	        .substr($charid,16, 4).$hyphen
	        .substr($charid,20,12);
	    return $uuid;
	}
?>