<?php

include 'koneksi.php';
$query = "SELECT * from dht ORDER BY id DESC LIMIT 1";
$hasil  =mysqli_query($conn, $query);
  
$response = array();
if(mysqli_num_rows($hasil) > 0 ){

  while($x = mysqli_fetch_array($hasil)){
    $h['temperatur'] = $x["temperatur"];
    $h['kelembapan'] = $x["kelembapan"];
    $h['gas'] = $x["gas"];

    array_push($response, $h);
  }
  
  echo json_encode([
    'status' => 200,
    'message' => 'Ok',
    'data' => $response
  ]);
}else {
  echo json_encode([
    'status' => 404,
    'data' => null,
    'message' => 'Tidak ada data untuk ditampilkan'
  ]);
} ?>
