const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/message', aiController.handleMessage);

module.exports = router;

