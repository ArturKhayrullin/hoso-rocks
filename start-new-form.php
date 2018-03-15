<?php

require_once(dirname(__FILE__).'/PHPMailer-master/src/PHPMailer.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$bodytext="";

foreach ($_POST as $key => $value) {
	$bodytext=$bodytext."\n".$key.': '.$value."\n";
}





$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if file already exists
if (file_exists($target_file)) {
    // echo "Sorry, file already exists.";
    $target_file=uniqid().$target_file;
    // $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "pdf" && $imageFileType != "doc" && $imageFileType != "docx") {
    echo "Sorry, only PDF, DOC & DOCX files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

echo $uploadOk;

$email = new PHPMailer();
$email->Subject   = 'Buro: Start New Project';
$email->Body      = $bodytext;
$email->AddAddress('audiostocks@gmail.com');

if ($uploadOk!=0)
	$email->AddAttachment($target_file);

$email->Send();


?>