const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o pacote cors
const app = express();

const ambiente = process.env.NODE_ENV || 'prod';

const port = ambiente === 'test' ? 5000 : 3000;

app.use(bodyParser.json());

// Configure o middleware do CORS
app.use(
  cors({
    origin: 'http://localhost:8080', // Substitua pela URL do seu aplicativo Vue.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  })
);

const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

if (ambiente !== 'test') {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

module.exports = app;
