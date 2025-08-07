
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Chat from './components/Chat';
import Features from './components/Features';
import HeartBackground from './components/HeartBackground';
import Notifications from './components/Notifications';
import './App.css';

function App() {
  const [phone, setPhone] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "Welcome to our dating service with 6000 potential dating partners! Type 'PENZI' to begin registration.",
      isUser: false,
      time: new Date()
    }
  ]);

  // Always send user input to backend after phone is entered
  const handleSendMessage = async (message) => {
    const userMessage = {
      text: message,
      isUser: true,
      time: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Always send every message to backend, let backend control the flow
    try {
      const response = await axios.post('http://172.31.12.169:5001/api/sms', {
        from: phone || message, // send phone if known, else send message (for first PENZI/phone input)
        message: message
      });
      // If backend returns a phone prompt, set phone if valid
      if (/^2547\d{8}$/.test(message.trim()) || /^07\d{8}$/.test(message.trim())) {
        let normalizedPhone = message.trim();
        if (/^07\d{8}$/.test(normalizedPhone)) {
          normalizedPhone = '254' + normalizedPhone.slice(1);
        }
        setPhone(normalizedPhone);
      }
      setMessages(prev => [
        ...prev,
        {
          text: response.data.response,
          isUser: false,
          time: new Date()
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          text: "Sorry, we're having trouble connecting to the service. Please try again later.",
          isUser: false,
          time: new Date()
        }
      ]);
    }
  };

  return (
    <div className="app">
      <HeartBackground />
      <div className="container">
        <Features/>
        <Header />
        <Notifications phone={phone} />
        <Chat messages={messages} onSendMessage={handleSendMessage} hasEnteredPhone={!!phone} />
      </div>
    </div>
  );
}

export default App;
