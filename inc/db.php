<?php

session_start();
//$db = new PDO("mysql:host=web22.meebox.net;dbname=mattskea_portfolio", "mattskea", "Uzb2W1x1i6");
$db = new PDO("mysql:host=localhost;dbname=techtalks", "techtdbadmin", "qwertydba");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
