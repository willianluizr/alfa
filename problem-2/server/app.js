const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const forkifyRoutes = require('./routes/forkifyRoutes');
app.use('/api/forkify/search', forkifyRoutes);

const asaasRoutes = require('./routes/asaasRoutes');
app.use('/api/asaas', asaasRoutes);

const server = app.listen(port, () => {
  console.log(`O servidor está rodando em http://localhost:${port}`);
});

module.exports = {
  server
};
