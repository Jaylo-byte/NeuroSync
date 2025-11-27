import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { sendVoiceData } from "../services/api";

export default function VoiceRecorder({ onVoiceSent }) {
  const { t, i18n } = useTranslation();
  const recognitionRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleRecord = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recording) {
      // Start recording
      const recog = new SpeechRecognition();
      const langMap = {
        'en': 'en-US',
        'es': 'es-ES',
        'fr': 'fr-FR',
        'sw': 'sw-TZ',
        'lg': 'lg-UG'
      };
      recog.lang = langMap[i18n.language] || 'en-US';
      recog.continuous = true;
      recog.interimResults = true;
      
      recog.onresult = (e) => {
        const transcript = Array.from(e.results)
          .map((r) => r[0].transcript)
          .join(" ");
        setText(transcript);
      };

      recog.onend = () => {
        if (recording && text.trim()) {
          handleSendVoice(text.trim());
        }
        setRecording(false);
      };

      recog.onerror = (e) => {
        console.error('Speech recognition error:', e);
        setRecording(false);
      };

      recog.start();
      recognitionRef.current = recog;
      setRecording(true);
      setText("");
    } else {
      // Stop recording
      recognitionRef.current?.stop();
      setRecording(false);
    }
  };

  const handleSendVoice = async (transcribedText) => {
    if (!transcribedText.trim()) return;

    setProcessing(true);
    try {
      const response = await sendVoiceData(transcribedText, i18n.language);
      
      // Notify parent component (ChatBox) about the voice message
      if (onVoiceSent) {
        onVoiceSent({
          userText: transcribedText,
          aiResponse: response.message,
          audioUrl: response.audioUrl,
          emotion: response.emotion,
          confidence: response.confidence,
          suggestions: response.suggestions
        });
      }
      
      setText("");
    } catch (error) {
      console.error("Error processing voice:", error);
      alert("Error processing voice. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-2">🎤 {t('voiceRecorder.title')}</h2>
      {text && (
        <div className="mb-2 p-2 bg-gray-700 rounded text-sm">
          📝 {text}
        </div>
      )}
      <button
        onClick={handleRecord}
        disabled={processing}
        className={`px-6 py-2 rounded-lg font-medium disabled:opacity-50 ${
          recording ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {processing ? t('chat.thinking') : recording ? t('voiceRecorder.stop') : t('voiceRecorder.start')}
      </button>
      {recording && (
        <div className="mt-2 text-sm text-red-400 animate-pulse">🔴 Recording...</div>
      )}
    </div>
  );
}
