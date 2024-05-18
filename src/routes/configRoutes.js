const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');

router.put('/config', configController.updateConfiguration);
router.get('/config', configController.getConfiguration);

module.exports = router;