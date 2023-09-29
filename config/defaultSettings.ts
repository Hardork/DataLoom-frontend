import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  title: 'Goat BI',
  navTheme: "light",
  layout: "top",
  contentWidth: "Fluid",
  fixedHeader: false,
  fixSiderbar: true,
  colorPrimary: "#1677FF",
  splitMenus: false,
  siderMenuType: "sub",
  pwa: true,
  logo: "/logo.svg",
  token: {}
};


export default Settings;

// {
//   navTheme: "light",
//   "layout": "top",
//   "contentWidth": "",
//   "fixedHeader": false,
//   "fixSiderbar": true,
//   "colorPrimary": "#1677FF",
//   "splitMenus": false,
//   "siderMenuType": "sub",
//   "pwa": true,
//   "logo": "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
//   "token": {}
// }
