<?php

include '../inc/db.php';
//session_start();

$email = $_GET['email'];
$pass =  $_GET['pass'];

// var_dump($_GET);

$stmt = $db->prepare('SELECT * FROM users WHERE email=:email AND pass=:pass');
$stmt->bindValue(':email', $email);
$stmt->bindValue(':pass', $pass);
$stmt->execute();

// var_dump($_GET);

if ($user = $stmt->fetchObject()) {
    $_SESSION['user_id'] = $user->id;
    $_SESSION['ar'] = $user->arid;
    $_SESSION['fname'] = $user->fname;
    $_SESSION['email'] = $user->email;
    if ($user->arid > 4) {
        /* ADMIN */
        echo '{"status":"ok", "location":"./admin-index.php"}';
    } else if($user->arid <= 5 & $user->arid >= 1){
        /* BASRIC USER */
        echo '{"status":"ok", "location":"./index.php"}';
    }

} else {
    echo '{"status":"error"}';
    
}    