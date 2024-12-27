import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Avatar, Divider } from 'antd';
import { UserOutlined, RobotOutlined, FieldTimeOutlined, FileTextOutlined } from '@ant-design/icons';
import './styles.less';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
}

interface ChatDisplayProps {
  messages: Message[];
  currentSession?: {
    title: string;
    createTime: string;
    messageCount?: number;
  };
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ messages, currentSession }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-display">
      {currentSession && (
        <div className="chat-header">
          <div className="chat-title">
            <h2>{currentSession.title}</h2>
          </div>
          <div className="chat-info">
            <span className="chat-info-item">
              <FieldTimeOutlined /> {currentSession.createTime}
            </span>
            {currentSession.messageCount && (
              <span className="chat-info-item">
                <FileTextOutlined /> {currentSession.messageCount} 条对话
              </span>
            )}
          </div>
          <Divider style={{ margin: '12px 0' }} />
        </div>
      )}
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