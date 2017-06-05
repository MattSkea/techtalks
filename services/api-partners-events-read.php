<?php
include '../inc/db.php';


$stmt = $db->prepare('SELECT epartners.pid, partners.pname, partners.url, techevents.tename, imagelabels.ilabel, imagelabels.ialt FROM epartners
	INNER JOIN partners ON epartners.pid = partners.id
	INNER JOIN techevents ON epartners.eid = techevents.id
	INNER JOIN partnerilabels ON partners.id = partnerilabels.pid
	INNER JOIN imagelabels ON partnerilabels.ilid = imagelabels.id;
	');

$stmt->execute();

$rows = array();

while ($epartners = $stmt->fetchObject()) {
	$rows[] = $epartners;
}

$sEPartnerRows = json_encode($rows);

echo $sEPartnerRows;
