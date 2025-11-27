const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');

// Analyze voice input (text from speech-to-text)
router.post('/analyze', voiceController.analyzeVoice);

// Get audio response for text
router.post('/speak', voiceController.getAudioResponse);

module.exports = router;

