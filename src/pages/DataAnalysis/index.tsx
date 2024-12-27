import React, { useState } from 'react';
import { Menu } from 'antd';
import { BarChartOutlined, HistoryOutlined } from '@ant-design/icons';
import UserCenter from './components/UserCenter';
import DataAnalysisContent from '@/components/DataAnalysisContent';
import ChatInput from '@/components/ChatInput'; 
import ChatDisplay from '@/components/ChatDisplay'; 

import './styles.less';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
};

const DataAnalysis: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>('1');
  const [openKeys, setOpenKeys] = useState<string[]>(['history']);
  const [showDataAnalysis, setShowDataAnalysis] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleProfileClick = () => {};
  const handleSettingsClick = () => {};
  const handleLogoutClick = () => {};
  const handleUseCase = (caseId: string) => {};

  const handleSessionClick = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setSessions(prev => prev.map(session => ({
      ...session,
      selected: session.id === sessionId
    })));
  };

  const analysisCases = [
    {
      id: '1',
      title: '销售数据分析',
      type: '数据可视化',
      prompt: '分析销售数据趋势并生成可视化图表...',
      fileUrl: 'sales_data.csv'
    },
    {
        id: '2',
        title: '销售数据分析',
        type: '数据可视化',
        prompt: '分析销售数据趋势并生成可视化图表...',
        fileUrl: 'sales_data.csv'
      },
    // 可以添加更多案例
  ];

  const handleSendMessage = (content: string) => {
    const newMessage = { 
      id: Date.now().toString(), 
      content, 
      sender: 'user' as const 
    };
    setMessages(prev => [...prev, newMessage]);

    setLoading(true);
    // 模拟 AI 回复
    setTimeout(() => {
      const aiMessage = { 
        id: Date.now().toString(),
         content: '这是AI的回复',
          sender: 'ai' 
        };
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="data-analysis-layout">
      <div className="data-analysis-sidebar">
        <div className="data-analysis-sidebar-header">
          <span>DataLoom</span>
        </div>
        
        <Menu
          mode="inline"
          className="data-analysis-menu"
          selectedKeys={[selectedSessionId]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
        >
          <Menu.Item 
            key="askData" 
            icon={<BarChartOutlined />}
            className="data-analysis-menu-item"
            onClick={() => setShowDataAnalysis(true)}
          >
            智能问数
          </Menu.Item>

          <Menu.Item 
            key="analysis" 
            icon={<BarChartOutlined />}
            className="data-analysis-menu-item"
            onClick={() => setShowDataAnalysis(true)}
          >
            数据分析
          </Menu.Item>
          
          <Menu.SubMenu
            key="history"
            icon={<HistoryOutlined />}
            title="历史对话"
            className="data-analysis-submenu"
          >
            {sessions.map(session => (
              <Menu.Item 
                key={session.id}
                className={`data-analysis-session-item ${session.selected ? 'data-analysis-session-item-selected' : ''}`}
                onClick={() => handleSessionClick(session.id)}
              >
                <div className="data-analysis-session-content">
                  <div className="data-analysis-session-title">新对话</div>
                  <div className="data-analysis-session-message">{session.lastMessage}</div>
                  <div className="data-analysis-session-time">{new Date(session.timestamp).toLocaleDateString()}</div>
                </div>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        </Menu>
        
        <UserCenter
          username="用户名"
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onLogoutClick={handleLogoutClick}
        />
      </div>

      <div className="data-analysis-container">
        {showDataAnalysis ? (
          <DataAnalysisContent 
            cases={analysisCases}
            onUseCase={handleUseCase}
          />
        ) : (
            <div className="data-analysis-chat-area">
                <ChatDisplay messages={messages}/>
                <ChatInput onSendMessage={handleSendMessage} loading={loading} />
            </div>
        )}
        
      </div>

    </div>
  );
};

export default DataAnalysis;
