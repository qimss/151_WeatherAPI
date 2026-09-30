const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")))

app.get("/api/kota/lokasi", async (req, res) => {
    const kota = req.query.kota || "jakarta"
    const apiKey = "Mjwd0V99XMeuaLX3ur5N"
    const url = `https://api.maptiler.com/geocoding/${kota}.json?key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        console.log(response.data);

        const data = response.data

        const lokasi = data.features[0].text || data.features[0].place_name;
        const [longitude, latitude] = data.features[0].geometry.coordinates;

        const getContext = (idPrefix) => {
            const item = data.features[0].context?.find((c) => c.id.startsWith(idPrefix));
            return item ? item.text : null;
        };

        const negara = getContext("country")
        const provinsi = getContext("region")
        const kecamatan = getContext("subdistrict") || getContext("locality") || getContext("district") || getContext("county") || getContext("municipality");
        
        res.json({
            kota: lokasi,
            negara : negara,
            provinsi : provinsi,
            kecamatan : kecamatan,
            longitude : longitude,
            latitude : latitude,
        })
        
    } catch (error){
        console.log(error.message);
        return res.status(500).json({
            message: "Gagal mengambil data dari API Maptiler"
        });
    }
})

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})