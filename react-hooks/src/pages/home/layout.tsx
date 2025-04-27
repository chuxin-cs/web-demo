import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'hooks',
    label: 'ahooks',
    icon: <SettingOutlined />,
    children: [
      { key: 'useLatest', label: 'useLatest' },
      { key: 'useUnmount', label: 'useUnmount' },
    ],
  },
];

const Layouts: React.FC = () => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    // 根据点击的菜单项 key 进行路由跳转
    navigate(`/${e.key}`);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['useLatest']}
      defaultOpenKeys={['hooks']}
      mode="inline"
      items={items}
    />
  );
};

export default Layouts;