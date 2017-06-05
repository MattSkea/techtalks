<?php 
include '../inc/db.php';


$stmt = $db->prepare('SELECT teslocation.tesid, teslocation.lid, techevents.tename, locations.address, techevents.tedescription,teslocation.eventst, teslocation.eventet, teslocation.totalattending, teslocation.attendlimit, imagelabels.ilabel, imagelabels.ialt FROM teslocation 
	INNER JOIN techevents ON teslocation.tesid = techevents.id
	INNER JOIN locations ON teslocation.lid = locations.id
	INNER JOIN teventilabels ON techevents.id = teventilabels.tesid
	INNER JOIN imagelabels ON imagelabels.id = teventilabels.ilid
	');
$stmt->execute();

$rows = array();

while ($article = $stmt->fetchObject()) {


	$rows[] = $article;
}

$sEventRows = json_encode($rows);

echo $sEventRows;