import React, { useState } from "react";
import axios from "axios";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!query.trim()) return;
    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:7000/api/v1/ai/ask", { query });
      const botMsg = { sender: "bot", text: res.data.response || "No answer found." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error talking to AI:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error fetching response." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <FaRobot size={24} />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white shadow-2xl rounded-lg flex flex-col overflow-hidden border">
          {/* Header */}
          <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-2">
            <h2 className="text-lg font-bold">Ask Anything 🤖</h2>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes size={18} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <p className="text-gray-500 text-sm italic">Thinking...</p>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded-lg px-3 py-1 focus:outline-none"
              placeholder="Type your question..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
