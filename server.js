require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const STORE_ID = process.env.STORE_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Configuración de CORS con un dominio específico
const corsOptions = {
  origin: 'https://tokkencba.com',  // Dominio de tu frontend
  methods: 'GET, POST',  // Métodos permitidos
  allowedHeaders: 'Content-Type, Authorization',  // Headers permitidos
};

// Aplica CORS con las opciones específicas
app.use(cors(corsOptions));

app.use(express.json());

// Ruta para obtener productos desde Tiendanube
app.get('/api/products', async (req, res) => {
    try {
      console.log('Request received for products'); // Log para depurar
      const response = await axios.get(`https://api.tiendanube.com/v1/${STORE_ID}/products`, {
        headers: {
          'Authorization': `bearer ${ACCESS_TOKEN}`,
          'User-Agent': 'MyApp (email@example.com)',
        },
      });
      res.json(response.data);  // Responde con los productos obtenidos
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  });
  
