import React, {useEffect, useState} from 'react';
import { notification } from 'antd';
import {history} from "@@/core/history";
import {useModel} from "@umijs/max";

const AiWebSocket = (userId: any) => {


  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser, webSocket } = initialState ?? {};

  const [msg, setMsg] = useState({
    title: undefined,
    description: undefined,
    chartId: undefined,
    type: undefined
  })

  useEffect(() => {
    if (msg?.type === 'success') {
      notification.open({
        type: "success",
        message: msg.title,
        description: msg.description,
        onClick: () => {
          console.log(msg.chartId)
          history.push( '/chart_detail/' + msg.chartId);
        }
      });
      return;
    }
    if (msg?.type === 'error') {
      notification.open({
        type: "error",
        message: msg.title,
        description: msg.description
      });
      return;
    }
  }, [msg])

  useEffect(() => {
    const handleMessage = (event:any) => {
      // 处理收到的消息
      console.log('收到消息：', event.data);
      setMsg(JSON.parse(event.data))
    };

    // 假设ws是已经创建好的WebSocket实例
    console.log(userId.userId)
    const wsPath = REACT_APP_ENV === 'dev' ? 'ws://localhost:8081/api/websocket/ai/' : 'ws://101.126.147.234:8081/api/websocket/ai/'
    const ws = new WebSocket(wsPath  + currentUser?.id);


    ws.onmessage = (event: any) => {
      handleMessage(event);
    };

    ws.onopen = (event: any) => {
      console.log('连接已建立')
    }

    return () => {
      ws.close();
    };
  }, []);

  return<></>;
};

export default AiWebSocket;
