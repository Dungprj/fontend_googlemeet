import React, { useState, useEffect } from 'react';
import {
    startConnection,
    sendMessage,
    onMessageReceived
} from '../../../Services/signalRService';

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('User1');
    const [message, setMessage] = useState('');

    useEffect(() => {
        startConnection();
        onMessageReceived((user, message) => {
            setMessages(prev => [...prev, { user, message }]);
        });
    }, []);

    return (
        <div>
            <h2>Realtime Chat</h2>
            <input
                value={user}
                onChange={e => setUser(e.target.value)}
                placeholder='Enter your name'
            />
            <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder='Type a message...'
            />
            <button onClick={() => sendMessage(user, message)}>Send</button>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.user}:</strong> {msg.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatComponent;
