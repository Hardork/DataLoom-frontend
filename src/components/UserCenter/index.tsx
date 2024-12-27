import React from 'react';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './styles.less';

interface UserCenterProps {
  username: string;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
  collapsed?: boolean; // 添加折叠状态属性
}

const UserCenter: React.FC<UserCenterProps> = ({
  username,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  collapsed = false, // 默认为非折叠状态
}) => {
  const items: MenuProps['items'] = [
    { key: 'profile', label: '个人信息', onClick: onProfileClick },
    { key: 'settings', label: '设置', onClick: onSettingsClick },
    { key: 'logout', label: '退出登录', onClick: onLogoutClick },
  ];

  return (
    <div className={`user-center ${collapsed ? 'collapsed' : ''}`}>
      <Dropdown menu={{ items }} placement="topRight" trigger={['click']}>
        <div className="user-info">
          <Avatar icon={<UserOutlined />} />
          {!collapsed && <span className="username">{username}</span>}
        </div>
      </Dropdown>
    </div>
  );
};

export default UserCenter;
