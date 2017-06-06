<?php
include '../inc/db.php';

$stmt = $db->prepare('SELECT partners.id, partners.pname, partners.url, imagelabels.ilabel, imagelabels.ialt FROM partners
	INNER JOIN partnerilabels ON partners.id = partnerilabels.pid
	INNER JOIN imagelabels ON partnerilabels.ilid = imagelabels.id');

$stmt->execute();

$rows = array();

while ($partners = $stmt->fetchObject()) {
	$rows[] = $partners;
}

$sPartnersRows = json_encode($rows);

echo $sPartnersRows;