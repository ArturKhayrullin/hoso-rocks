<?php

$name = htmlspecialchars($_POST["first_name"]);
$email = htmlspecialchars($_POST["email"]);
$message = htmlspecialchars($_POST["message"]);


	mail('buro@hoso.pro', 'From: Say Hi', 'Name: '.$name.'<br/>E-mail: '.$email.'<br/>Message: '.$message);
?>