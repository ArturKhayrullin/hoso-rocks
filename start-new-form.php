<?php



$bodytext="";

foreach ($_POST as $key => $value) {
	$bodytext=$bodytext."\n".$key.': '.$value."\n";
}





// $target_dir = "uploads/";
// $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
// $uploadOk = 1;
// $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// // Check if file already exists
// if (file_exists($target_file)) {
//     echo "Sorry, file already exists.";
//     $uploadOk = 0;
// }
// // Check file size
// if ($_FILES["fileToUpload"]["size"] > 1000000) {
//     echo "Sorry, your file is too large.";
//     $uploadOk = 0;
// }
// // Allow certain file formats
// if($imageFileType != "pdf" && $imageFileType != "doc" && $imageFileType != "docx") {
//     echo "Sorry, only PDF, DOC & DOCX files are allowed.";
//     $uploadOk = 0;
// }
// // Check if $uploadOk is set to 0 by an error
// if ($uploadOk == 0) {
//     echo "Sorry, your file was not uploaded.";
// // if everything is ok, try to upload file
// } else {
//     if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
//         echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
//     } else {
//         echo "Sorry, there was an error uploading your file.";
//     }
// }

// echo $uploadOk;

// if ($uploadOk!=0) {
//     $bodytext=$bodytext."\n".'File link:'.': '.'http://hoso.pro/'.$target_file."\n";
// }


mail("buro@hoso.pro", 'Buro: Start New Project', $bodytext)


?>