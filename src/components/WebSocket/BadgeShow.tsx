import React, {useEffect, useState} from 'react';


interface BadgeShowProps {
  userId: Object;
  onShow: (checked: boolean) => void;
}

const BadgeShow: React.FC<BadgeShowProps> = ({ userId, onShow }) => {

  const [msg, setMsg] = useState({
    title: undefined,
    description: undefined,
    chartId: undefined,
    type: undefined
  })

  useEffect(() => {
    console.log('徽标显示')
    onShow(true)
  }, [msg])

  useEffect(() => {
    const handleMessage = (event:any) => {
      // 处理收到的消息
      console.log('收到消息：', event.data);
      setMsg(JSON.parse(event.data))
    };

    // 假设ws是已经创建好的WebSocket实例

    console.log('用户' + userId)
    const ws = new WebSocket(REACT_APP_ENV === 'dev' ? 'ws://localhost:8081/api/websocket/' : 'ws://101.126.147.234:8081/api/websocket/'  + userId);


    ws.onmessage = (event) => {
      handleMessage(event);
    };

    ws.onopen = (event) => {
      console.log('连接已建立')
    }

    return () => {
      ws.close();
    };
  }, []);

  return<></>;
};

export default BadgeShow;
