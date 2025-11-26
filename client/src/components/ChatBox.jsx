import React, { useState } from "react";
import { sendTextMessage } from "../services/api";
export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello 👋, I'm NeuroSync. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage, { sender: "ai", text: "Processing..." }]);
    setInput("");

    // Later: call backend API for emotion + response
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col h-96">
      <h2 className="text-xl font-semibold mb-3">💬 Chat</h2>
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-600 self-end text-right"
                : "bg-gray-700 text-left"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-700 text-white p-2 rounded-l-lg outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-cyan-600 hover:bg-cyan-700 px-4 rounded-r-lg font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}

//new code
export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello 👋, I'm NeuroSync. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendTextMessage(input);
      const aiMsg = { sender: "ai", text: res.message || "..." };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error contacting AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col h-96">
      <h2 className="text-xl font-semibold mb-3">💬 Chat</h2>
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.sender === "user"
                ? "bg-blue-600 self-end text-right ml-auto"
                : "bg-gray-700 text-left"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-400 animate-pulse">Thinking...</div>
        )}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-700 text-white p-2 rounded-l-lg outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-cyan-600 hover:bg-cyan-700 px-4 rounded-r-lg font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
