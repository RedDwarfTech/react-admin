import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Red Dwarf',
  pwa: false,
  logo: '/icons/icons/OSX/Images.xcassets/AppIcon.appiconset/MacHuge_512pt.png',
  iconfontUrl: '',
};

export default Settings;
