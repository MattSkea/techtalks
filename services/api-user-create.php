<?php

include '../inc/db.php';

$email = $_POST["email"];
$pass = sha1($_POST["pass"]);
$fname = $_POST["fname"];
$lname = $_POST["lname"];
$mobile = $_POST['mobile'];

/*print_r($_POST);*/

$stmt = $db->prepare("CALL CreateSystemUser(:email, :pass, :fname, :lname, :mobile)");

$stmt->bindValue(":email", $email);
$stmt->bindValue(":pass", $pass);
$stmt->bindValue(":fname", $fname);
$stmt->bindValue(":lname", $lname);
$stmt->bindValue(":mobile", $mobile);

$stmt->execute();

echo '{"status":"success"}';