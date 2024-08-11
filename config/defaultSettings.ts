import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  title: 'AI Viz',
  navTheme: "light",
  layout: "top",
  contentWidth: "Fluid",
  fixedHeader: false,
  fixSiderbar: true,
  colorPrimary: "#1677FF",
  splitMenus: false,
  siderMenuType: "sub",
  fixedHeader: true,
  pwa: true,
  logo: "/logo.svg",
  token: {
    // 自定义顶部菜单栏背景颜色
    header: {
      colorBgHeader: '#1F2329',
      colorBgRightActionsItemHover: 'rgba(0,0,0,0.06)',
      colorTextRightActionsItem: 'rgba(255,255,255,0.65)',
      colorHeaderTitle: '#fff',
      colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
      colorBgMenuItemSelected: 'rgba(0,0,0,0.15)',
      colorTextMenuSelected: '#fff',
      colorTextMenu: 'rgba(255,255,255,0.75)',
      colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
      colorTextMenuActive: 'rgba(255,255,255,0.95)',
    },
  }
};


export default Settings;
