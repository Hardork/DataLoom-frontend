import { useModel } from '@@/exports';
import {Button, Card, Col, Collapse, Dropdown, Input, message, Modal, Result, Row, Space, Spin, Table, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import './index.css'
import WebSocketComponent from "@/components/WebSocket";
import {
  DatabaseOutlined,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined
} from "@ant-design/icons";
import {
  addUserAskSqlHistory,
  getChatById,
  getUserChatHistory,
  getUserSqlChatRecord, userChatForSql
} from "@/services/DataLoom/aiController";
import {ModalForm, ProFormSelect, ProFormText, ProFormTextArea, ProSkeleton} from "@ant-design/pro-components";
import {useLocation} from "umi";
import {listUserDataSource} from "@/services/DataLoom/coreDataSourceController";
/**
 * 我的图表页面
 * @constructor
 */
const AiAskData: React.FC = () => {
  const location = useLocation();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  // 当前聊天模型
  const [curModel, setCurModel] = useState<API.GetUserChatHistoryVO>();
  const [loading, setLoading] = useState<boolean>(true);
  const [chatHistory, setChatHistory] = useState<API.GetUserChatHistoryVO[]>()
  // 历史记录
  const [chatRecord, setChatRecord] = useState<API.GetUserSQLChatRecordVO[]>([])
  // 添加选项
  const [selectItem, setSelectItem] = useState([])
  // 内容
  const [content, setContent] = useState<string>('')
  // 选项卡
  const[selectIndex, setSelectIndex] = useState<number>(-1)
  // 提交状态
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [curSQL, setCurSQL] = useState<string>('')
  const [result, setResult] = useState<Record<string, any>[]>()
  const [columns, setColumns] = useState()
  const [status, setStatus] = useState<number>(0)
  const addFormIndex = [
    {
      name: 'dataId',
      required: true,
      label: '数据源',
      message: '数据源不得为空',
      type: 'select',
      selectItem: selectItem
    },
  ];

  // 加载页面数据
  const loadData = async () => {
    setLoading(true);
    setSelectItem([])
    // 加载用户数据集
    const userDatasourceRes = await listUserDataSource()
    if (userDatasourceRes.code === 0) {
      for(const item of userDatasourceRes.data ?? []) {
        const cur = {
          label: <>
            {item.type === 'excel' && <>
              <img src={'/assets/Excel.svg'}/>
            </>}
            {item.type === 'mysql' && <>
              <img src={'/assets/Mysql.svg'}/>
            </>}
            {item.type === 'api' && <>
              <img src={'/assets/API.svg'}/>
            </>}
            <span style={{
              marginLeft: '10px'
            }}>{item.name}</span>
          </>,
          value: item.id,
        }
        // @ts-ignore
        setSelectItem(result => [...result, cur])
      }
    }

    // 加载历史对话
    const historyRes = await getUserChatHistory();
    if (historyRes.data) {
      console.log(historyRes.data)
      setChatHistory(historyRes.data);
    }
    // 加载用户选择的信息
    if (location.search) {
      const chatId = location.search.substring(1, location.search.length)
      // 请求当前模型
      const param = {
        chatId: chatId
      }
      // @ts-ignore
      const res =  await getChatById(param)
      if (res.data) {
        setCurModel(res.data)
      }
    }
    // 获取历史信息
    setLoading(false);
  };

  // 加载对话记录
  const loadRecord = async () => {
    const chatRecordParam = {chatId: curModel?.chatId}
    // 获取对应的数据源信息

    // 加载用户对话历史
    const chatRecordRes = await getUserSqlChatRecord(chatRecordParam)
    if (chatRecordRes.data) {
      setChatRecord(chatRecordRes.data)
    }

  }

  // 用户发送信息
  const sendQuestion = async () => {
    if (submitting) {
      return;
    }

    if (content === '') {
      message.error('请输入内容')
      return;
    }
    if(!curModel) {
      message.error('请先选择助手')
      return;
    }

    setSubmitting(true)
    const question = {
      question: content,
      chatId: curModel?.chatId
    }
    setContent('')
    const addItem = {
      chatRole: 0,
      content: content
    }
    setChatRecord(item => [...item, addItem])
    const res = await userChatForSql(question)
    if (res.code !== 0) {
      message.error(res.message)
    }
  }

  const warning = async (getUserChatHistoryVO : API.GetUserChatHistoryVO) => {
    Modal.confirm({
      title: '删除图表',
      content: '删除图表后，系统不提供数据恢复的功能！',
      onOk: async () => {
        // const res = await
        // if (res.code === 0) {
        //   message.success('删除成功')
        //   // 重新加载
        //   loadData()
        // } else {
        //   message.error('删除失败')
        // }

      }
    });
  };

  const scrollDomRef = useRef<HTMLDivElement>(null);

  // 加载对话记录
  useEffect(() => {
    loadRecord()
  },[curModel])

  // 自动滚动
  let timeoutTimer: number | NodeJS.Timeout | null | undefined = null
  let intervalTimer: number | NodeJS.Timeout | undefined
  const autoScroll = () => {
    if (timeoutTimer) {
      window.clearTimeout(timeoutTimer)
    }
    // 容器高度
    const clientH = scrollDomRef.current && scrollDomRef.current.clientHeight || 0
    // 滚动高度
    const scrollH = scrollDomRef.current && scrollDomRef.current.scrollHeight || 0
    if (intervalTimer) {
      window.clearInterval(intervalTimer)
    }
    // 无滚动
    if (scrollH === clientH) return
    //
    if (scrollDomRef.current) {
      const distance = scrollH - clientH
      console.log(distance)
      scrollDomRef.current.scrollTop = scrollH
    }
  }

  // 渲染websocket消息
  useEffect(() => {
    if (submitting) { // 在submitting中，不断追加
      const arr = chatRecord
      arr[arr.length - 1].res = result
      setChatRecord(arr)
      autoScroll()
    }
  }, [result])

  // 渲染websocket消息
  useEffect(() => {
    if (submitting) { // 在submitting中，不断追加
      const arr = chatRecord
      arr[arr.length - 1].columns = columns
      setChatRecord(arr)
      autoScroll()
    }
  }, [columns])

  // 渲染websocket消息
  useEffect(() => {
    if (submitting) { // 在submitting中，不断追加
      const arr = chatRecord
      arr[arr.length - 1].sql = curSQL
      setChatRecord(arr)
      autoScroll()
    }
  }, [curSQL])

  // 渲染websocket消息
  useEffect(() => {
    if (submitting) { // 在submitting中，不断追加
      const arr = chatRecord
      arr[arr.length - 1].status = status
      setChatRecord(arr)
      autoScroll()
    }
  }, [status])


  // 建立连接
  useEffect(() => {
    loadData();
    const handleMessage = (event:any) => {
      // 处理收到的消息
      const res = JSON.parse(event.data)
      console.log(res)
      if (res.type === 'start') { //会话开始
        // 增加系统回答框
        const addItem : any = {
          chatRole: 1,
          res: [],
          columns: [],
          sql: '',
          status: 'success',
          loading: true
        }

        // 添加聊天框
        setChatRecord(item => [...item, addItem])
      } else if (res.type === 'end') { //结束会话
        setSubmitting(false);
        setResult([])
        setStatus(0)
        setColumns(undefined)
      } else if (res.type === 'error') {
        setSubmitting(false);
        setStatus(1)
      }
      else {
        const t_columns =  res.columns.map((item: any) => {
          return {
            title: item,
            dataIndex: item
          }
        })
        setColumns(t_columns)
        setResult(res.res);
        setCurSQL(res.sql)
      }
    };

    // 假设ws是已经创建好的WebSocket实例
    const wsPath = REACT_APP_ENV === 'dev' ? 'ws://localhost:8081/api/websocket/sql/' : 'ws://101.126.147.234:8081/api/websocket/sql/';
    const ws = new WebSocket(wsPath  + currentUser?.id);

    ws.onmessage = (event: any) => {
      handleMessage(event);
    };

    ws.onopen = (event: any) => {
      console.log('sql连接已建立', event)
    }

    ws.onerror = (e) => {
      console.log('链接错误',e)
    }

    return () => {
      ws.close();
    };
  }, []);

  const editItems = (item:  API.GetUserChatHistoryVO) => [
    {
      label: <a onClick={() => {
        warning(item)
      }}>
        删除
      </a>,
      key: 'delete',
    }
  ]

  return (
    <div
      className="my-chat"
      style={{
        margin: '-32px -40px',
      }}
    >
      <WebSocketComponent userId={currentUser?.id}></WebSocketComponent>
      <Row gutter={16}>
        <Col span={5}>
          <Card style={{ minHeight: '93vh' }}>
            <div>
              <h3>智能问数</h3>
            </div>
            <Space
              direction="horizontal"
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
              size={20}
            >
              <div>
                <Input placeholder="搜索历史对话" suffix={<SearchOutlined />} />
              </div>
              <a
                onClick={() => {
                  handleModalOpen(true);
                }}
              >
                <PlusOutlined />
              </a>
            </Space>
            <div className="margin-16" />
            <div
              style={{
                height: '70vh',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'grey',
              }}
            >
              <>
                {chatHistory?.map((item, index) => (
                  <>
                    <Card
                      style={{ width: '100%', marginTop: 16 }}
                      className={index === selectIndex ? 'active-item' : ''}
                      hoverable
                      loading={loading}
                      onClick={() => {
                        setCurModel(item);
                        setSelectIndex(index);
                      }}
                    >
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}>
                        <div className={index === selectIndex ? 'active-color' : ''}>
                          <img
                            src={currentUser?.userAvatar}
                            style={{ width: '30px', borderRadius: '50%' }}
                          />
                          <span style={{ marginLeft: '20px', fontSize: '14px' }}>
                            {item.assistantName}
                          </span>
                          <div style={{ marginLeft: '50px', fontSize: '12px' }}>
                            <p>{item.functionDes}</p>
                          </div>
                        </div>
                        <div>
                          {/*<Dropdown menu={{ items: editItems(item) }}>*/}
                          {/*  <Button*/}
                          {/*    size={'small'}*/}
                          {/*    onClick={(event) => {*/}
                          {/*      event.preventDefault();*/}
                          {/*    }}*/}
                          {/*  >*/}
                          {/*    /!*TODO: 编辑、删除、重命名图表*!/*/}
                          {/*    <img src={'/系统配置.svg'} alt="系统配置" />*/}
                          {/*  </Button>*/}
                          {/*</Dropdown>*/}
                        </div>
                      </div>
                    </Card>
                  </>
                ))}
              </>
            </div>
          </Card>
        </Col>
        <Col
          span={19}
          style={{
            position: 'relative',
          }}
        >
          {curModel && (
            <>
              <Col span={24}>
                <Card style={{ height: '93vh', position: 'relative' }}>
                  {/*助手信息*/}
                  <div
                    style={{
                      width: '100%',
                      minHeight: '84vh',
                      maxHeight: '84vh',
                      overflowY: 'auto',
                    }}
                    ref={scrollDomRef}
                  >
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <h3 style={{ fontWeight: 'bold' }}>{curModel?.assistantName}</h3>
                      <Tag icon={<DatabaseOutlined />} color="#55acee">
                        {curModel.datasourceName}
                      </Tag>
                    </div>

                    <div className="margin-16" />
                    {/* 渲染历史对话 */}
                    {curModel && (
                      <>
                        <div>
                          <Space direction="horizontal">
                            <img src={'/model.png'} style={{ width: '30px' }} />
                            <div
                              style={{
                                marginTop: '5px',
                                padding: '10px',
                                background: '#f4f6f8',
                                borderRadius: '10px',
                              }}
                            >
                              {'你好，我是' +
                                curModel?.assistantName +
                                ',' +
                                '我可以' +
                                curModel?.functionDes}
                            </div>
                          </Space>
                          <div className="margin-16" />
                        </div>
                      </>
                    )}
                    {chatRecord === undefined && (
                      <>
                        <ProSkeleton type="result" />
                      </>
                    )}
                    {chatRecord?.map((item) => (
                      <>
                        <div>
                          <Space direction="horizontal">
                            {item.chatRole === 0 && (
                              <div style={{ display: 'flex' }}>
                                <img
                                  src={currentUser?.userAvatar}
                                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                />
                                <div
                                  style={{
                                    marginLeft: '10px',
                                    padding: '10px',
                                    background: '#e7f7ff',
                                    borderRadius: '10px',
                                  }}
                                >
                                  {item.content}
                                </div>
                              </div>
                            )}
                            {item.chatRole === 1 && (
                              <div style={{ display: 'flex' }}>
                                {item.status === 1 ? (
                                  <>
                                    <Result status="error" title="查询异常" />
                                  </>
                                ) : (
                                  <>
                                    <img
                                      src={'/model.png'}
                                      style={{ width: '30px', height: '30px' }}
                                    />
                                    <div
                                      style={{
                                        marginLeft: '10px',
                                        padding: '10px',
                                        background: '#f4f6f8',
                                        borderRadius: '10px',
                                      }}
                                    >
                                      <Table
                                        style={{
                                          minWidth: '300px',
                                        }}
                                        columns={item.columns}
                                        dataSource={item.res}
                                        pagination={false}
                                        size={'small'}
                                      />
                                      <Collapse
                                        items={[
                                          {
                                            key: '1',
                                            label: (
                                              <>
                                                <span style={{ color: '#1677ff' }}>查询SQL</span>
                                              </>
                                            ),
                                            children: <p>{item.sql}</p>,
                                          },
                                        ]}
                                        size={'small'}
                                        bordered={false}
                                      />
                                    </div>
                                  </>
                                )}
                                <div></div>
                              </div>
                            )}
                          </Space>
                          <div className="margin-16" />
                        </div>
                      </>
                    ))}
                  </div>

                  <div
                    style={{
                      position: 'fixed',
                      bottom: '3vh',
                      width: '60%',
                      borderRadius: '10px',
                      backgroundColor: 'white',
                      height: '5vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '2px 4px 10px 4px rgb(242, 242, 243)',
                    }}
                  >
                    <Input
                      placeholder="请输入内容"
                      value={content}
                      bordered={false}
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                      onPressEnter={() => {
                        sendQuestion();
                      }}
                      suffix={
                        <>
                          {!submitting && (
                            <a
                              onClick={() => {
                                sendQuestion();
                              }}
                            >
                              <img src={'/send.png'} style={{ width: '24px' }} />
                            </a>
                          )}
                          {submitting && <Spin indicator={antIcon} />}
                        </>
                      }
                    />
                  </div>
                </Card>
              </Col>
            </>
          )}
          {curModel === undefined && (
            <>
              <Col span={24}>
                <Card style={{ height: '93vh', position: 'relative', backgroundColor: '#F6F7F9' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '800px',
                        minWidth: '500px',
                        marginTop: '10vh',
                        height: '100%',
                        flexShrink: 1,
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '700px',
                          textAlign: 'left',
                          padding: '0 16px 0 16px',
                          marginBottom: '32px',
                          boxSizing: 'border-box',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '28px',
                            marginBottom: '4px !important',
                            lineHeight: '42px !important',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <p>
                            <span
                              style={{
                                color: 'rgb(36, 84, 255)',
                              }}
                            >
                              <strong>问数</strong>
                            </span>
                            <span
                              style={{
                                color: 'rgb(0, 0, 0)',
                              }}
                            >
                              用
                            </span>
                            <span
                              style={{
                                color: 'rgb(36, 84, 255)',
                              }}
                            >
                              <strong>DATALOOM</strong>
                            </span>
                          </p>
                        </div>
                        <div
                          style={{
                            fontSize: '16px !important',
                            lineHeight: '26px !important',
                            color: 'var(--txt_icon_black_1, #1a2029)',
                          }}
                        >
                          <p
                            style={{
                              lineHeight: 1,
                            }}
                          >
                            <strong>数据检索无需复杂！试问LOOM，他会给你所有数据🚀</strong>
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          paddingBottom: '400px',
                        }}
                      >
                        <Card style={{ marginBottom: '10px' }}>
                          <div
                            style={{
                              display: 'inlineBlock',
                              color: 'var(--txt_icon_black_1, #1a2029)',
                              fontFamily: 'PingFang SC',
                              fontWeight: 600,
                              fontStyle: 'normal',
                              fontSize: '14px',
                              lineHeight: '22px',
                              textAlign: 'left',
                              flex: 1,
                              maxHeight: '40px',
                              overflowY: 'hidden',
                            }}
                          >
                            <span
                              style={{
                                color: 'var(--txt_stroke_blue_1, #386fff)',
                              }}
                            >
                              数据矿工
                            </span>
                            ⚒️：提前有价值数据
                          </div>
                        </Card>
                        <Card style={{ marginBottom: '10px' }}>
                          <div
                            style={{
                              display: 'inlineBlock',
                              color: 'var(--txt_icon_black_1, #1a2029)',
                              fontFamily: 'PingFang SC',
                              fontWeight: 600,
                              fontStyle: 'normal',
                              fontSize: '14px',
                              lineHeight: '22px',
                              textAlign: 'left',
                              flex: 1,
                              maxHeight: '40px',
                              overflowY: 'hidden',
                            }}
                          >
                            <span
                              style={{
                                color: 'var(--txt_stroke_blue_1, #386fff)',
                              }}
                            >
                              实时观察
                            </span>
                            👀：请给我最近一周数据📊
                          </div>
                        </Card>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          minWidth: '872px',
                          maxWidth: '872px',
                          paddingBottom: '12px',
                          boxSizing: 'border-box',
                          borderRadius: '12px',
                          flex: 'none',
                          position: 'relative',
                        }}
                      >
                        <Input
                          placeholder="请输入内容"
                          value={content}
                          onChange={(e) => {
                            setContent(e.target.value);
                          }}
                          onPressEnter={() => {
                            sendQuestion();
                          }}
                          suffix={
                            <>
                              {!submitting && (
                                <a
                                  onClick={() => {
                                    sendQuestion();
                                  }}
                                >
                                  <img src={'/send.png'} style={{ width: '24px' }} />
                                </a>
                              )}
                              {submitting && <Spin indicator={antIcon} />}
                            </>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </>
          )}
        </Col>
      </Row>

      <ModalForm
        title={'新建对话'}
        width="600px"
        modalProps={{
          destroyOnClose: true,
        }}
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          console.log(value);
          const res = await addUserAskSqlHistory({ ...value });
          if (res.code === 0) {
            message.success('新建成功');
            handleModalOpen(false);
            loadData();
          } else {
            message.error(res.message);
          }
        }}
      >
        {addFormIndex.map((item, index) => (
          <div key={index}>
            {item.type === 'text' && (
              <>
                <ProFormText
                  rules={[
                    {
                      required: item.required,
                      message: item.message,
                    },
                  ]}
                  width="md"
                  name={item.name}
                  label={item.label}
                />
              </>
            )}

            {item.type === 'textArea' && (
              <>
                <ProFormTextArea
                  rules={[
                    {
                      required: item.required,
                      message: item.message,
                    },
                  ]}
                  width="md"
                  name={item.name}
                  label={item.label}
                />
              </>
            )}
            {item.type === 'select' && (
              <>
                <ProFormSelect
                  rules={[
                    {
                      required: item.required,
                      message: item.message,
                    },
                  ]}
                  request={async () => item.selectItem ?? []}
                  width="md"
                  name={item.name}
                  label={item.label}
                />
              </>
            )}
          </div>
        ))}
      </ModalForm>
    </div>
  );
};


export default AiAskData;


