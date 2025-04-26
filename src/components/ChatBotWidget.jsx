import React, { useState } from 'react';
import axios from 'axios';

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:7000/api/v1/ai/ask', {
        query: input
      });

      const botReply = response.data.response || "No response received.";
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages([...newMessages, { sender: 'bot', text: 'Error reaching chatbot API.' }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border border-gray-300">
          <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-bold">ChatBot</span>
            <button onClick={toggleChat} className="text-white text-xl">×</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`text-sm p-2 rounded-lg max-w-[75%] ${msg.sender === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-200 self-start'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 border rounded px-3 py-1 text-sm"
              placeholder="Ask something..."
            />
            <button onClick={sendMessage} className="ml-2 bg-blue-600 text-white px-3 py-1 rounded text-sm">Send</button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatBotWidget;
