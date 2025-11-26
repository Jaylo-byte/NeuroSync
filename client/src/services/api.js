import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Node.js backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 🎙️ Send voice or text for analysis
export const sendVoiceData = async (formData) => {
  try {
    const response = await API.post("/voice/analyze", formData);
    return response.data;
  } catch (error) {
    console.error("Error sending voice data:", error);
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
