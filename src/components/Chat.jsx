import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Chat = ({ messages, onSendMessage, hasEnteredPhone }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-container" style={{
      backgroundColor: 'pink',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      marginBottom: '40px'
    }}>
      <div className="chat-header" style={{
        background: 'linear-gradient(to right, #ff4d6d, #ff758c)',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <div className="simulated-phone" style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '20px',
          padding: '5px 15px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 'bold'
        }}>
          <span>📱</span>
          <span>22141</span>
        </div>
        <h2 style={{ fontWeight: 500 }}>PENZI</h2>
      </div>
      
      <div className="messages" style={{
        padding: '20px',
        height: '400px',
        overflowY: 'auto',
        backgroundColor: '#f9f9f9'
      }}>
        {messages.map((msg, index) => (
          <div key={index} className="message" style={{
            display: 'flex',
            marginBottom: '20px',
            justifyContent: msg.isUser ? 'flex-end' : 'flex-start'
          }}>
            {!msg.isUser && (
              <div className="avatar" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(to right, #ff4d6d, #ff758c)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                flexShrink: 0,
                marginRight: '10px'
              }}>
                PZ
              </div>
            )}
            <div className="content" style={{
              maxWidth: '70%',
              background: msg.isUser 
                ? 'linear-gradient(to right, #ff4d6d, #ff758c)'
                : '#e6e6e6',
              color: msg.isUser ? 'white' : 'inherit',
              borderRadius: '18px',
              padding: '12px 15px',
              borderBottomLeftRadius: msg.isUser ? '18px' : '5px',
              borderBottomRightRadius: msg.isUser ? '5px' : '18px',
              marginLeft: msg.isUser ? 'auto' : '0'
            }}>
              <div className="name" style={{
                fontWeight: 'bold',
                marginBottom: '5px',
                color: msg.isUser ? 'white' : '#ff4d6d'
              }}>
                {msg.isUser ? 'You' : 'Penzi Service'}
              </div>
              <div className="text" style={{ whiteSpace: 'pre-line' }}>
                {msg.text}
              </div>
              <div className="time" style={{
                fontSize: '0.8rem',
                color: msg.isUser ? 'rgba(255,255,255,0.8)' : '#999',
                marginTop: '5px',
                textAlign: 'right'
              }}>
                {msg.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
            {msg.isUser && (
              <div className="avatar" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(to right, #ff4d6d, #ff758c)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                flexShrink: 0,
                marginLeft: '10px'
              }}>
                You
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="input-area" style={{
        display: 'flex',
        padding: '15px',
        backgroundColor: 'transparent',
        borderTop: '1px solid #eee'
      }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={hasEnteredPhone ? "Type your message..." : "Enter your phone number e.g. 254712345678"}
          style={{
            flex: 1,
            padding: '12px 15px',
            border: '1px solid #ddd',
            borderRadius: '25px',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
        <button type="submit" style={{
          background: 'linear-gradient(to right, #ff4d6d, #ff758c)',
          color: 'sky-blue',
          border: 'none',
          borderRadius: '25px',
          padding: '12px 25px',
          marginLeft: '10px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>Send</span>
          <FaPaperPlane />
        </button>
      </form>
      
      <div className="quick-commands" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '0 15px 15px'
      }}>
        <button 
          onClick={() => setMessage('start#')}
          className="command-btn" 
          style={{
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 15px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Start Registration
        </button>
        <button 
          onClick={() => setMessage('details#')}
          className="command-btn" 
          style={{
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 15px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Add Details
        </button>
        <button 
          onClick={() => setMessage('MYSELF ')}
          className="command-btn" 
          style={{
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 15px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Self Description
        </button>
        <button 
          onClick={() => setMessage('match#')}
          className="command-btn" 
          style={{
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 15px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Find Matches
        </button>
      </div>
    </div>
  );
};

export default Chat;