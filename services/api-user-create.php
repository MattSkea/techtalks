<?php

include '../inc/db.php';

$fname = $_POST["fname"];
$lname = $_POST["lname"];
$email = $_POST["email"];
$pass = $_POST["pass"];

print_r($_POST);

echo "{type:success}";