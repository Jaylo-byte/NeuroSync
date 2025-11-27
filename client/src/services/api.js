import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Node.js backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 🎙️ Send voice transcription for analysis (returns text + audio response)
export const sendVoiceData = async (text, language = 'en') => {
  try {
    const response = await API.post("/voice/analyze", { text, language });
    return response.data;
  } catch (error) {
    console.error("Error sending voice data:", error);
    throw error;
  }
};

// 🔊 Get audio response for text
export const getAudioResponse = async (text, language = 'en') => {
  try {
    const response = await API.post("/voice/speak", { text, language });
    return response.data;
  } catch (error) {
    console.error("Error getting audio response:", error);
    throw error;
  }
};

// 💬 Send text message to AI
export const sendTextMessage = async (text) => {
  try {
    const response = await API.post("/ai/message", { text });
    return response.data;
  } catch (error) {
    console.error("Error sending text message:", error);
    throw error;
  }
};

export default API;
