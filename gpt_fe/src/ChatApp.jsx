import React, { useState } from 'react';
import './ChatApp.css'
import axios from 'axios';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (inputValue) => {
    if (inputValue) {
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }
        };
        const newMessage = {
          input: inputValue,
        };

        const response = await axios.post('http://localhost:5000/', newMessage, config);
        const responseData = response.data;

        const newChatMessage = {
          text: inputValue,
          response: responseData
        };

        setMessages((prevMessages) => [...prevMessages, newChatMessage]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index}>
            <div className="user-message">
              <span>{message.text}</span>
            </div>
            <div className="response-message">
              <span>{message.response}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSendMessage(event.target.value);
              event.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatApp;