<?php
include '../inc/db.php';


$stmt = $db->prepare('SELECT partners.id, partners.pname, partners.url, imagelabels.ilabel, imagelabels.ialt FROM  partners
	INNER JOIN ppartners ON partners.id = ppartners.pid
	INNER JOIN partnerilabels ON partners.id = partnerilabels.pid
	INNER JOIN imagelabels ON partnerilabels.ilid = imagelabels.id');

$stmt->execute();

$rows = array();

while ($ppartners = $stmt->fetchObject()) {
	$rows[] = $ppartners;
}

$sPPartnerRows = json_encode($rows);

echo $sPPartnerRows;
