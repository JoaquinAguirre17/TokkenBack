require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const STORE_ID = process.env.STORE_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

app.use(cors());  // Permite solicitudes CORS
app.use(express.json());

// Ruta para obtener productos desde Tiendanube
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(`https://api.tiendanube.com/v1/${STORE_ID}/products`, {
      headers: {
        'Authorization': `bearer ${ACCESS_TOKEN}`,
        'User-Agent': 'MyApp (email@example.com)',
      },
    });
    res.json(response.data);  // Pasa los productos obtenidos a tu frontend
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
