<?php
include 'inc/db.php';
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Techtalks</title>

	<!-- FAVICON-->
	<link rel="shortcut icon" type="image/png" href="img/site-layout/favicon-32x32.png"/>

	<!--IMPORTED FONTS-->
	<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
	<!--Import alerts-->
	<link rel="stylesheet" type="text/css" href="dist/sweetalert.css">

	<!-- CUSTOM CSS SHEETS-->
	<link rel="stylesheet" href="css/style.css">
</head>
<body>


	<!-- BODY -->

	<!--**************************************-->
	<!--********* HEADER NAVIGATION **********-->
	<?php require_once "content/header-navigation.php"; ?>

	<!--*************HOME PAGE****************-->
	<?php require_once "content/home.php"; ?>
	<!--*************EVENTs PAGE****************-->
	<?php require_once "content/event.php"; ?>
	<?php require_once "content/event-2.php"; ?>
	<?php require_once "content/event-3.php"; ?>
	<?php require_once "content/events.php"; ?>
	<!--*************our pertners****************-->
	<?php require_once "content/our-partners.php"; ?>
	<!--*************EVENT BOOKING****************-->
	<?php require_once "content/book-event-user.php"; ?>
	<?php require_once "content/book-event-guest.php"; ?>
	<!--*************user-profile****************-->
	<?php require_once "content/user-view-profile.php"; ?>
	<!--*************REGISTER PAGE************-->
	<!--*************LOGIN PAGE***************-->
	<?php require_once "content/overlay.php"; ?>

	<!--**************************************-->
	<!--********* FOOTER NAVIGATION **********-->
	<?php require_once "content/footer-navigation.php"; ?>

	<!--Import jquery-->
	<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
	<!--Import sweet alerts-->
	<script src="dist/sweetalert.min.js"></script>
	<!--Import font awesome-->
	<script src="https://use.fontawesome.com/aa9b1b4b5c.js"></script>

	<!-- CUSTOM JS SHEETS-->
	<script async defer
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3Mh7iMONAFg64CcmvokDMe3NOYzDJmPc&callback=initMap">
</script>
<script src="js/script.js"></script>

</body>
</html>