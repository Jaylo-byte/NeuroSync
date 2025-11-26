const natural = require('natural');
const { SentimentAnalyzer, PorterStemmer } = natural;

// Initialize sentiment analyzer
const analyzer = new SentimentAnalyzer('English', PorterStemmer, ['negation']);

// Emotion keywords mapping
const emotionKeywords = {
  happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'love', 'glad', 'pleased', 'fantastic', 'awesome'],
  sad: ['sad', 'depressed', 'down', 'unhappy', 'miserable', 'lonely', 'hurt', 'crying', 'upset', 'disappointed'],
  angry: ['angry', 'mad', 'furious', 'annoyed', 'frustrated', 'irritated', 'rage', 'hate'],
  anxious: ['anxious', 'worried', 'nervous', 'stressed', 'scared', 'afraid', 'fear', 'panic'],
  neutral: ['okay', 'fine', 'alright', 'normal', 'nothing', 'meh']
};

function detectEmotion(text) {
  if (!text || typeof text !== 'string') {
    return { emotion: 'Neutral', confidence: 0.5 };
  }

  const lowerText = text.toLowerCase();
  const scores = {};
  
  // Count keyword matches
  Object.keys(emotionKeywords).forEach(emotion => {
    scores[emotion] = emotionKeywords[emotion].reduce((count, keyword) => {
      return count + (lowerText.includes(keyword) ? 1 : 0);
    }, 0);
  });

  // Use sentiment analysis
  try {
    const sentiment = analyzer.getSentiment(text.split(' '));
    
    // Combine keyword matching with sentiment
    if (sentiment > 0.3) {
      scores.happy = (scores.happy || 0) + 2;
    } else if (sentiment < -0.3) {
      scores.sad = (scores.sad || 0) + 2;
      scores.angry = (scores.angry || 0) + 1;
    }
  } catch (err) {
    console.error('Sentiment analysis error:', err);
  }

  // Find dominant emotion
  const maxScore = Math.max(...Object.values(scores));
  const detectedEmotion = Object.keys(scores).find(
    emotion => scores[emotion] === maxScore
  ) || 'neutral';

  const confidence = Math.min(maxScore / 5, 1.0);

  return {
    emotion: detectedEmotion.charAt(0).toUpperCase() + detectedEmotion.slice(1),
    confidence: confidence,
    scores: scores
  };
}

function getSuggestions(emotion) {
  const suggestions = {
    Happy: [
      "That's wonderful! Keep spreading positivity!",
      "Consider journaling about what made you happy today",
      "Share your joy with someone you care about"
    ],
    Sad: [
      "I'm here for you. Consider talking to a friend or therapist",
      "Try some light exercise or a walk in nature",
      "Listen to uplifting music or watch something comforting"
    ],
    Angry: [
      "Take deep breaths and count to ten",
      "Try physical activity to release tension",
      "Consider what's really bothering you and address it calmly"
    ],
    Anxious: [
      "Practice deep breathing exercises",
      "Try meditation or mindfulness",
      "Break down what's worrying you into smaller, manageable steps"
    ],
    Neutral: [
      "How can I help you feel better today?",
      "Is there something specific on your mind?",
      "Would you like to talk about anything?"
    ]
  };

  return suggestions[emotion] || suggestions.Neutral;
}

module.exports = { detectEmotion, getSuggestions };

