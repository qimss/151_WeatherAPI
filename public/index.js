fetch("/api/kota/lokasi")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById("kota").innerText = data.kota;
        document.getElementById("koordinat").innerText = data.koordinat;
    })
    .catch(error => {
        console.log(error);
    });