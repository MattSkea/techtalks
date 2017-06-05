<?php

$stmt = $db->prepare('SELECT partners.id, partners.pname, partners.url FROM partners WHERE id NOT IN(SELECT pid FROM epartners)');

$stmt->execute();

$rows = array();

while ($epartners = $stmt->fetchObject()) {
	$rows[] = $epartners;
}

$sEventRows = json_encode($rows);

echo $sEventRows;