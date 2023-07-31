<?php
 header("Access-Control-Allow-Origin: *");
 header('Access-Control-Allow-Credentials: true');
 header('Access-Control-Max-Age: 86400');


include 'koneksi.php';


$t = $_POST['temperatur'];
$h = $_POST['kelembapan'];
$g = $_POST['gas'];


$simpan = mysqli_query($conn, "INSERT INTO dht VALUES (NULL, '$t', '$h', '$g', NULL, NULL);");

if ($simpan) {
    echo json_encode(array(
        "status" => 200,
        "message" => "Data berhasil diinput",
    ));
}else{
    echo json_encode(array(
        "status" => 404,
        "message" => "Terjadi kesalahan saat menginput data !",
    ));
}





?>