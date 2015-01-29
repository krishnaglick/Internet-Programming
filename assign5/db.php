<?php 
	$hostname="cop4813.unf.edu";
	$username="n00728069"; //write your username
	$password="copn00728069"; //write your password
	$db_name=""; //write your db name
	$con=mysql_connect($hostname,$username,$password);
	mysql_select_db($db_name,$con) or die ("Cannot connect the Database");
	mysql_query("SET NAMES 'utf8'",$con); 
 ?>