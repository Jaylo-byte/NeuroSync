import React from "react";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 bg-gray-800 text-center text-2xl font-bold">
        🧠 NeuroSync
      </header>
      <main className="flex-1 p-4">
        <Home />
      </main>
    </div>
  );
}
