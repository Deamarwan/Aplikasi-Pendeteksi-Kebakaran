<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
</head>
<body>

    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h2 id="dataSuhu">0</h2>
                        <h2 id="dataPh">0</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

<script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
<script>

    setInterval(() => {
        $.ajax({
  url: 'http://192.168.245.235/MonitoringLab/tampil.php',
  method: 'GET',
  dataType: 'json',
  success: function(data) {

    var suhu = data.data[0].suhu_air;
    var ph = data.data[0].ph_air;
    $('#dataSuhu').html(suhu);
    $('#dataPh').html(ph);
  },
  error: function(xhr, status, error) {
    console.log(xhr, status, error)
  }
});
    }, 1000);

    
  
    

</script>
</body>
</html>