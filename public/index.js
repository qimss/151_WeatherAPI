function cariLokasi() {
    const inputVal = document.getElementById("kotaInput").value.trim();
    const query = inputVal ? `?kota=${encodeURIComponent(inputVal)}` : "";

    fetch(`/api/kota/lokasi${query}`)   
        .then(response => {
            if (!response.ok) throw new Error("Gagal mengambil data dari server");
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById("kota").innerText = data.kota || "-";
            document.getElementById("negara").innerText = data.negara || "-";
            document.getElementById("provinsi").innerText = data.provinsi || "-";
            document.getElementById("kecamatan").innerText = data.kecamatan || "-";
            document.getElementById("longitude").innerText = data.longitude || "-";
            document.getElementById("latitude").innerText = data.latitude || "-";
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Gagal mengambil data lokasi!");
        });
}

document.getElementById("btn").addEventListener("click", cariLokasi);

document.getElementById("kotaInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        cariLokasi();
    }
});

// Panggil pertama kali saat halaman dimuat
cariLokasi();