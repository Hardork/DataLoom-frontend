import '@umijs/max';
import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Drawer, List, message, Space} from "antd";
import {hasReadMessage, listUnReadMessage} from "@/services/DataLoom/userMessageController";
import moment from "moment";
import {Link} from "umi";
import {useModel} from "@@/exports";

/**
 * 显示消息
 * @constructor
 */
export const Message = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [unReadMessage, setUnReadMessage] = useState([]);
  const [loading, setLoading] = useState(false)
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser, webSocket } = initialState ?? {};

  const readAllMessage = async () => {
    if (unReadMessage.length === 0) {
      message.warning('没有未读消息')
      return;
    }
    const res = await hasReadMessage();
    if (res.code === 0) {
      // 清理消息列表
      setUnReadMessage([])
      // 隐藏徽标
      setShow(false)
    } else {
      message.error(res.message)
    }
  }

  const showDrawer =  async () => {
    // 请求数据
    setOpen(true);
    setLoading(true)
    const res = await listUnReadMessage();
    if (res.code === 0) {
      // @ts-ignore
      setUnReadMessage(res.data)
    } else {
      message.error(res.message)
    }
    setLoading(false)
  };

  const onClose = () => {
    setOpen(false);
  };

  const queryUnReadMessage = async () => {
    const res = await listUnReadMessage();
    if (res.data) {
      if (res.data.length > 0) {
        setShow(true)
      }
    }
  }

  useEffect(() => {
    queryUnReadMessage()
    const ws = new WebSocket(REACT_APP_ENV === 'dev' ? 'ws://localhost:8081/api/websocket/budge/' : 'ws://101.126.147.234:8081/api/websocket/budge/'  + currentUser?.id);


    ws.onmessage = () => {
      setShow(true)
    };

    ws.onopen = () => {
      console.log('徽标连接已建立')
    }

    return () => {
      ws.close();
    };
  }, []);


  return (
    currentUser !== null && <>
      <div>
        <div
          style={{
            display: 'flex',
            height: 26,
            width: '26px'
          }}
          onClick={() => {
            showDrawer()
          }}
        >
          <Badge dot={show}>
            <img src={'/notice.png'} style={{width: '100%'}}/>
          </Badge>
        </div>

        <Drawer title="未读消息" placement="right" onClose={onClose} open={open} extra={
          <Space>
            <Button onClick={readAllMessage} type="primary">
              一键已读
            </Button>
          </Space>
        }>
          <List
            dataSource={unReadMessage}
            renderItem={(item: API.UserMessage) => (
              <List.Item>
                <Card title={item.title} style={{width: '100%'}}>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                      <>
                        {
                          item.route !== '' && (
                            <>
                              <Link to={item.route ?? '/add_chart'} onClick={() => {
                                onClose()
                              }}>{item.description}</Link>
                            </>
                          )
                        }
                        {
                          item.route === '' && (
                            <>
                              {item.description}
                            </>
                          )
                        }
                      </>
                    </div>
                    <div>
                      {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </Drawer>
      </div>
    </>


  );
};
