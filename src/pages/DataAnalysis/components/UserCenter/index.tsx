import React from 'react';
import { Dropdown, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import './index.less';

interface UserCenterProps {
  username?: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

const UserCenter: React.FC<UserCenterProps> = ({
  username = '用户名',
  onProfileClick,
  onSettingsClick,
  onLogoutClick
}) => {
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: '个人中心',
      onClick: onProfileClick
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
      onClick: onSettingsClick
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: onLogoutClick
    }
  ];

  return (
    <Dropdown
      menu={{ items: userMenuItems }}
      placement="topRight"
      trigger={['hover']}
      overlayClassName="data-analysis-user-dropdown"
    >
      <div className="data-analysis-user-center">
        <Avatar icon={<UserOutlined />} />
        <span className="data-analysis-user-name">{username}</span>
      </div>
    </Dropdown>
  );
};

export default UserCenter;