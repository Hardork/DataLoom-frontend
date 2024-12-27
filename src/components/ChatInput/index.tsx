import React, { useState } from 'react';
import { Input, Button, Upload } from 'antd';
import { SendOutlined, PaperClipOutlined, LoadingOutlined } from '@ant-design/icons';
import './styles.less';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, loading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-container">
        <Upload>
          <Button 
            type="text" 
            className="chat-upload-button" 
            icon={<PaperClipOutlined />} 
          />
        </Upload>
        <Input.TextArea
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onPressEnter={handleSend}
          placeholder="输入消息..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          className="chat-textarea"
        />
        <Button
          type="text"
          icon={loading ? <LoadingOutlined /> : <SendOutlined />}
          onClick={handleSend}
          loading={loading}
          className="chat-send-button"
        />
      </div>
    </div>
  );
};

export default ChatInput; 