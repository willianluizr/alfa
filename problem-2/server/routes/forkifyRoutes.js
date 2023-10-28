const express = require('express');
const router = express.Router();
const fortifyController = require('../controllers/forkifyController');

router.get('/', fortifyController.searchRecipe);

module.exports = router;