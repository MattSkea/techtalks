
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Techtalks</title>

	<!-- FAVICON-->
	<link rel="shortcut icon" type="image/png" href="./img/site-layout/favicon-32x32.png"/>

	<!--IMPORTED FONTS-->
	<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
	<!--Import alerts-->
	<link rel="stylesheet" type="text/css" href="./dist/sweetalert.css">

	<!-- CUSTOM CSS SHEETS-->
	<link rel="stylesheet" href="./css/style.css">
</head>
<body>
	<div id="appender">

	</div>

	<!-- BODY -->

	<!--**************************************-->
	<!--********* HEADER NAVIGATION **********-->
	<?php require_once "./admin/admin-header-navigation.php"; ?>

	<!--*************HOME PAGE****************-->
	<?php require_once "./admin/admin-home.php"; ?>

	<!--*************EVENTS PAGE****************-->
	<?php require_once "./admin/admin-events.php"; ?>

	<!--*************PARTNERS PAGE**************-->
	<?php require_once "./admin/admin-partners.php"; ?>

	<!--*************USERS PAGE***************-->
	<?php require_once "./admin/admin-users.php"; ?>
	
	<!--*************OVERLAY PAGE**************-->
	<?php require_once "./admin/admin-overlay.php"; ?>


	<!--**************************************-->
	<!--********* FOOTER NAVIGATION **********-->
	<?php require_once "./admin/admin-footer-navigation.php"; ?>

	<!--Import jquery-->
	<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
	<!--Import sweet alerts-->
	<script src="./dist/sweetalert.min.js"></script>
	<!--Import font awesome-->
	<script src="https://use.fontawesome.com/aa9b1b4b5c.js"></script>

	<!-- CUSTOM JS SHEETS-->
	<script async defer
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3Mh7iMONAFg64CcmvokDMe3NOYzDJmPc&callback=initMap">
</script>
<script src="./js/script.js"></script>

</body>
</html>
