<?php
include '../inc/db.php';

$stmt = $db->prepare('SELECT partners.id, partners.pname, partners.url FROM partners WHERE id NOT IN(SELECT pid FROM ppartners)');

$stmt->execute();

$rows = array();

while ($ppartners = $stmt->fetchObject()) {
	$rows[] = $ppartners;
}

$sEventRows = json_encode($rows);

echo $sEventRows;