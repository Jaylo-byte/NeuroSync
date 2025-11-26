import React from "react";

export default function VoicePlayer({ src }) {
  if (!src) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">🔈 AI Response Voice</h2>
      <audio controls className="w-full">
        <source src={src} type="audio/webm" />
        Your browser does not support audio playback.
      </audio>
    </div>
  );
}
