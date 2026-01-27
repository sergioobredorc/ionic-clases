const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, apiKey } = req.body;

    if (!message || !apiKey) {
      return res.status(400).json({ error: 'Falta mensaje o apiKey' });
    }

    const response = await axios.post('https://api.deepseek.com/chat/completions', {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1024
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const respuesta = response.data.choices[0]?.message?.content || 'No se pudo obtener respuesta';
    res.json({ respuesta });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Error al conectar con DeepSeek',
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});
