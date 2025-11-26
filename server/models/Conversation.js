const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous' },
  messages: [{
    text: String,
    emotion: String,
    confidence: Number,
    timestamp: { type: Date, default: Date.now },
    sender: { type: String, enum: ['user', 'ai'] }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', conversationSchema);

