import { Menu } from 'antd';
import {useEffect,useMemo} from 'react';
import type { MenuProps } from 'antd';
import {getRoutes} from "@/router/routes"
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const Layouts: React.FC = () => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    // 根据点击的菜单项 key 进行路由跳转
    navigate(`/${e.key}`);
  };
  
  const children = useMemo(() => {
    return getRoutes().map((item) => ({
      key: item.path,
      label: item.path,
    }));
  }, []);

  const items: MenuItem[] = [
    {
      key: 'hooks',
      label: 'ahooks',
      icon: <SettingOutlined />,
      children,
    },
  ];

  const hash = window.location.hash;
  // 去除 hash 中的 / 符号
  const processedHash = hash.substring(1).replace(/^\//, ''); 
  const defaultSelectedKeys = processedHash ? [processedHash] : ['useLatest'];

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={['hooks']}
      mode="inline"
      items={items}
    />
  );
};

export default Layouts;