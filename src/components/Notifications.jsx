import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notifications({ phone }) {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!phone) return;
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/notifications/${phone}`);
        setNotifications(res.data);
        setUnread(res.data.filter(n => !n.seen).length);
      } catch (e) {}
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, [phone]);

  const handleShow = () => setShow(!show);

  if (!phone) return null;
  return (
    <div style={{ position: 'relative', margin: '10px 0' }}>
      <button
        onClick={handleShow}
        style={{
          background: '#fffbe6',
          border: '1px solid #0000FF',
          borderRadius: '50%',
          width: 40,
          height: 40,
          position: 'relative',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: 20
        }}
        aria-label="Show notifications"
      >
        🔔
        {unread > 0 && (
          <span style={{
            position: 'absolute',
            top: 2,
            right: 2,
            background: '#ff4d4f',
            color: 'white',
            borderRadius: '50%',
            width: 18,
            height: 18,
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            border: '2px solidrgb(230, 247, 255)'
          }}>{unread}</span>
        )}
      </button>
      {show && (
        <div style={{
          position: 'absolute',
          top: 45,
          right: 0,
          background: 'white',
          border: '1px solidrgb(131, 62, 221)',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          minWidth: 300,
          zIndex: 1000,
          maxHeight: 300,
          overflowY: 'auto',
        }}>
          <div style={{ padding: '10px 15px', borderBottom: '1px solid  #0000FF', fontWeight: 'bold', background: '#fffbe6' }}>
            Notifications
            <button onClick={() => setShow(false)} style={{ float: 'right', background: 'none', border: 'none', fontSize: 18, cursor: 'pointer' }}>&times;</button>
          </div>
          <ul style={{ margin: 0, padding: '10px 20px' }}>
            {notifications.length === 0 && <li style={{ color: '#999' }}>No notifications</li>}
            {notifications.map(n => (
              <li key={n.id} style={{
                background: n.seen ? 'white' : '#e6f7ff',
                borderRadius: 5,
                marginBottom: 8,
                padding: '8px 10px',
                fontWeight: n.seen ? 'normal' : 'bold',
                color: n.seen ? '#333' : '#1890ff',
                boxShadow: n.seen ? 'none' : '0 1px 4px #bae7ff',
                transition: 'background 0.2s'
              }}>
                {n.message}
                <span style={{ float: 'right', fontSize: 11, color: '#aaa' }}>{new Date(n.created_at).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notifications;
