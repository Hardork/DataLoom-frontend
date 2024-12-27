import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Avatar } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import './styles.less';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
}

interface ChatDisplayProps {
  messages: Message[];
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-display">
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-wrapper ${
              message.sender === 'user' ? 'message-user' : 'message-ai'
            }`}
          >
            <Avatar
              className="message-avatar"
              icon={message.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
            />
            <div className="message-bubble">
              {message.sender === 'ai' ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                <div className="message-text">{message.content}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatDisplay; 