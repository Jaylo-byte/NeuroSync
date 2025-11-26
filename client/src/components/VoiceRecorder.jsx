import React, { useState } from "react";

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false);

  const handleRecord = () => {
    setRecording(!recording);
    // Later: integrate MediaRecorder + API
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-2">🎤 Voice Recorder</h2>
      <button
        onClick={handleRecord}
        className={`px-6 py-2 rounded-lg font-medium ${
          recording ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}
