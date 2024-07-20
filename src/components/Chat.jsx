import React, { useState } from "react";
import { useChat } from "../hooks/useChat";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setTalk } = useChat();

  const sendMessage = async () => {
    const userMessage = userInput;
    setUserInput("");
    setChatHistory([...chatHistory, { type: "user", message: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("https://virtual-ai-server.vercel.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      const botMessage = data.text;
      const audioData = data.audio;

      setChatHistory([
        ...chatHistory,
        { type: "user", message: userMessage },
        { type: "bot", message: botMessage },
      ]);

      // Play the audio
      const audioBuffer = Uint8Array.from(atob(audioData), (c) =>
        c.charCodeAt(0)
      ).buffer;
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContext.createBufferSource();

      audioContext.decodeAudioData(audioBuffer, (buffer) => {
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);

        setTalk(true);
        source.onended = () => setTalk(false);
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="w-[30%]">
      <div className="backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg w-full max-w-md p-4">
        <div id="chat-history" className="h-80 overflow-y-scroll mb-4">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg mb-2 ${
                msg.type === "user"
                  ? "bg-white bg-opacity-30 text-right"
                  : "bg-blue-200 text-left"
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <form id="chat-form" onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            id="user-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your message"
            className="flex-grow p-2 rounded-lg mr-2 focus:outline-none focus:ring-0"
            autocomplete="off"
          />
          <button
            type="submit"
            className="bg-[#1e3048] text-white py-2 px-4 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
      {loading && (
        <div
          id="loader"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <img src="/loader.gif" width="150px" alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
