<?php
session_start();
include 'dbconnect.php';
header("Content-Type: application/json; charset=UTF-8");
$u_V=230;
$lat=$_GET['lati'];
$long=$_GET['longi'];
if($u_V>=120 and $u_V<240){
    $level = 1;
}
else if($u_V>=240 and $u_V<400){
    $level = 2;
}
else if($u_V>400){
    $level = 3;
}
else{
    echo "Error in Input Volts";
}
$sql = "SELECT '$level' FROM evstations WHERE longitude= '$long' AND latitude='$lat' ";
$res = mysqli_query($conn,$sql);
if($res>1){
    echo 1;
}
else{
    echo 0;
}
?>

