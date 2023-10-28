const express = require('express');
const router = express.Router();
const asaasController = require('../controllers/asaasController');

router.get('/search/client', asaasController.searchClient);
router.post('/create/client', asaasController.createClient);

module.exports = router;
