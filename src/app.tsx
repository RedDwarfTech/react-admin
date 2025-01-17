import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type {RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import defaultSettings from '../config/defaultSettings';
import { sysDictionary, sysOrgs } from './services/ant-design-pro/global/dictionary';
import { userMenuTree } from './services/ant-design-pro/permission/menu/menu';
import { Route } from '@ant-design/pro-layout/lib/typings';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  dictionary?: API.Dictionary[];
  orgs?: API.OrgItem[];
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchDictionary?: () => Promise<API.Dictionary[] | undefined>;
  fetchOrgs?: () => Promise<API.OrgItem[]|undefined>;
  menuinfo?: Route[]
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };

  const fetchDictionary = async () => {
    try {
      const msg = await sysDictionary();
      return msg;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };

  const fetchOrgs = async () => {
    try {
      const msg = await sysOrgs();
      return msg;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };

  if (history.location.pathname !== "/user/login" && history.location.pathname !== "/user/login/") {
    const currentUser = await fetchUserInfo();
    const dictionary = await fetchDictionary();
    const orgs = await fetchOrgs();
    return {
      fetchUserInfo,
      currentUser,
      dictionary,
      orgs,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    fetchDictionary,
    fetchOrgs,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
   menu: {
      params: {
        userId: initialState?.currentUser?.userId,
      },
      request: async (params, defaultMenuData) => {
        if(initialState&&initialState.currentUser){
          // fetch menu when having auth info to avoid the dead loop
          const menuData = await userMenuTree(); 
          return menuData;
        }
      },
    },
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.nickname,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          
          
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
