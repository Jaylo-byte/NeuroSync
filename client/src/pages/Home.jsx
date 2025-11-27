import React, { useRef } from "react";
import VoiceRecorder from "../components/VoiceRecorder";
import ChatBox from "../components/ChatBoxClean";
import BrainAnimation from "../components/BrainAnimationClean";

export default function Home() {
  const chatBoxRef = useRef(null);

  const handleVoiceSent = (data) => {
    // Add messages to chat when voice is processed
    if (chatBoxRef.current) {
      chatBoxRef.current.addMessage({ sender: "user", text: data.userText });
      chatBoxRef.current.addMessage({ 
        sender: "ai", 
        text: data.aiResponse,
        audioUrl: data.audioUrl,
        emotion: data.emotion,
        confidence: data.confidence,
        suggestions: data.suggestions
      });
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 flex flex-col gap-4">
        <VoiceRecorder onVoiceSent={handleVoiceSent} />
        <ChatBox ref={chatBoxRef} />
      </div>
      <div className="flex justify-center items-center">
        <BrainAnimation />
      </div>
    </div>
  );
}
