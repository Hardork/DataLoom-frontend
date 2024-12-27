import {Message} from '@/components/RightContent';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import React, {useState} from 'react';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import {getLoginUser} from "@/services/DataLoom/userController";
import {Card, FloatButton} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  currentUser?: API.LoginUserVO;
  settings: any,
  webSocket?: any
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await getLoginUser();
      return res.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  // const { location } = history;
  // if (location.pathname !== loginPath) {
  //   const currentUser = await fetchUserInfo();
  //   const webSocket = new WebSocket('ws://localhost:8081/api/websocket/' + currentUser?.id);
  //   return {
  //     settings: defaultSettings,
  //     currentUser,
  //     webSocket
  //   };
  // }
  // 如果是登录页面不返回当前登录用户的信息
  return {
    settings: defaultSettings,
  }
}


// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return {
    actionsRender: () => [<Message key="doc" />],
    avatarProps: {
      src: initialState?.currentUser?.userAvatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
          <>
            <div>
              <FloatButton icon={<QuestionCircleOutlined/>} type="primary" style={{right: 0}} onClick={() => {
                setOpenDrawer(!openDrawer)
              }}/>
              {
                openDrawer && <>
                  <div className={"fade-in"} style={{
                    position: "fixed",
                    right: "5px",
                    bottom: "100px",
                    width: "400px",
                  }}>
                    <Card style={{
                      width: "100%",
                    }}>
                      <iframe
                        src="http://localhost:8080/ui/chat/51ccbe5c7543677a"
                        style={{
                          width: "100%",
                          height: "600px"
                        }}
                        frameBorder="0"
                        allow="microphone"
                      >
                      </iframe>
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 0,
                        height: 0,
                        borderLeft: "20px solid transparent", // 左边透明
                        borderBottom: "20px solid #1890ff", // 底部颜色
                      }}/>
                    </Card>
                  </div>
                </>
              }

            </div>
          </>
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  baseURL: 'http://localhost:8081/api',
  withCredentials: true,
  ...errorConfig,
};
