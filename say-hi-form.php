<?php

$name = htmlspecialchars($_POST["first_name"]);
$email = htmlspecialchars($_POST["email"]);
$message = htmlspecialchars($_POST["message"]);


	mail('audiostocks@gmail.com', 'From: Say Hi', 'Name: '.$name.'<br/>E-mail: '.$email.'<br/>Message: '.$message);
?>