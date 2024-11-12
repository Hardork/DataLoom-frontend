import {Button, Card, Col, Form, Input, message, Row, Space, Spin} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from "antd/es/form/Form";
import WebSocketComponent from "@/components/WebSocket";
import {history, useModel} from "@@/exports";
import AiWebSocket from "@/components/WebSocket/AiWebSocket";
import {chatWithTemp} from "@/services/DataLoom/aiController";
import OmsViewMarkdown from "@/components/OmsViewMarkdown";
import {ProFormSelect, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
import {ProFormSwitch} from "@ant-design/pro-form";
import {CheckOutlined, CloseOutlined, LoadingOutlined} from "@ant-design/icons";
import {addUserAiRole} from "@/services/DataLoom/userCreateAssistantController";

/**
 * 添加图表页面
 * @constructor
 */
const UserAddAssistant: React.FC = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [result, setResult] = useState('')
  const [chatRecord, setChatRecord] = useState<API.ChatHistory[]>([])
  const [ tempAssistant, setTempAssistant ] = useState<API.AiTempChatRequest>()
  // 内容
  const [content, setContent] = useState<string>('')
  const addFormIndex = [
    {
      name: 'assistantName',
      required: true,
      label: '助手名称',
      message: '助手名称不得为空',
      type: 'text',
      placeholder: '例如：编程助手'
    },
    {
      name: 'type',
      required: true,
      label: '助手类型',
      message: '助手类型不得为空',
      type: 'select',
      selectItem: [
        {
          value: '编程',
          label: '编程',
        },
        {
          value: '创作',
          label: '创作',
        },
        {
          value: '健康',
          label: '健康',
        },
        {
          value: '歌手',
          label: '歌手',
        },
        {
          value: '文书',
          label: '文书',
        },
        {
          value: '职场',
          label: '职场',
        },
        {
          value: '情感',
          label: '情感',
        },
        {
          value: '脑暴',
          label: '脑暴',
        },
        {
          value: '其它',
          label: '其它',
        },
      ],
    },
    {
      name: 'historyTalk',
      label: '历史对话',
      type: 'switch',
      checkedChildren: (
        <>
          <CheckOutlined />
        </>
      ),
      unCheckedChildren: (
        <>
          <CloseOutlined />
        </>
      ),
    },
    {
      name: 'inputModel',
      required: true,
      label: '输入模板',
      message: '输入模板不得为空',
      type: 'textArea',
      placeholder: '比如输入：出现空指针异常，我将给你解决该异常的方案'
    },
    {
      name: 'functionDes',
      required: true,
      label: '功能描述',
      message: '功能描述不得为空',
      type: 'textArea',
      placeholder: '例如：编程出现了问题？给出你的问题，我将帮你解答'
    },
    {
      name: 'roleDesign',
      required: false,
      label: '角色设定',
      message: '',
      type: 'text',
      placeholder: '例如：你是一名编程高手'
    },
    {
      name: 'targetWork',
      required: false,
      label: '目标任务',
      message: '',
      type: 'text',
      placeholder: '例如：根据我的问题给出解决方案'
    },
    {
      name: 'requirement',
      required: false,
      label: '需求说明',
      message: '',
      type: 'textArea',
      placeholder: '例如：要求给出的解决方案要简洁明了'
    },
    {
      name: 'style',
      required: false,
      label: '风格设定',
      message: '',
      type: 'text',
      placeholder: '例如：简介明了'
    },
  ];


  // 渲染websocket消息
  useEffect(() => {
    if (submitting) {
      const arr = chatRecord
      console.log(result)
      arr[arr.length - 1].content = result
      setChatRecord(arr)
      autoScroll()
    }
  }, [result])

  // 建立连接
  useEffect(() => {
    const handleMessage = (event:any) => {
      // 处理收到的消息
      console.log('收到消息：', event.data);
      const res = JSON.parse(event.data)
      if (res.type === 'start') { //会话开始
        const addItem = {
          chatRole: 1,
          content: result
        }
        setChatRecord(item => [...item, addItem])
      } else if (res.type === 'end') { //结束会话
        setSubmitting(false);
        setResult('')
      } else {
        setResult(result => result + res.content);
      }

    };

    // 假设ws是已经创建好的WebSocket实例
    const wsPath = REACT_APP_ENV === 'dev' ? 'ws://localhost:8081/api/websocket/ai/' : 'ws://101.126.147.234:8081/api/websocket/ai/';
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


  const scrollDomRef = useRef<HTMLDivElement>(null);
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
    if (scrollH == clientH) return
    //
    if (scrollDomRef.current) {
      const distance = scrollH - clientH
      console.log(distance)
      scrollDomRef.current.scrollTop = scrollH
    }
  }

  // 创建助手
  const onCreate = async () => {
    try {
      const values = await form.validateFields();
      const param = {
        ...values,
        historyTalk: values.historyTalk !== undefined
      }
      // 提交
      const res = await addUserAiRole(param);
      if (res.code === 0) { // 跳转到助手页面
        message.success('创建成功')
        history.push('/assistant_list')
      } else {
        message.error(res.message)
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  // 用户发送信息
  const sendQuestion = async () => {
    if (submitting) {
      return;
    }

    if(!tempAssistant) {
      message.error('请先保存后再调试助手')
      return;
    }

    if (content === '') {
      return;
    }
    setSubmitting(true)
    setContent('')
    const addItem = {
      chatRole: 0,
      content: content
    }
    setChatRecord(item => [...item, addItem])
    const param : API.AiTempChatRequest = {
      ...tempAssistant,
      text: content
    }
    const res = await chatWithTemp(param)
    if (res.code !== 0) {
      message.error(res.message)
    }
  }


  /**
   * 保存助手
   * @param values
   */
  const onFinish = async (values: any) => {
    setTempAssistant(values);
    message.success('保存成功')
  };

  return (
    <div className="add-chart">
      <WebSocketComponent userId={currentUser?.id}></WebSocketComponent>
      <AiWebSocket></AiWebSocket>
      <Row gutter={24}>
        <Col span={12}>
          <Card title="新建助手" style={{minHeight: '88vh'}}>
            <Form
              form={form}
              onFinish={onFinish}
            >
              {addFormIndex.map((item, index) => (
                <div key={index}>
                  {/*text textArea select*/}
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
                        placeholder={item.placeholder}
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
                        placeholder={item.placeholder}
                      />
                    </>
                  )}
                  {item.type === 'switch' && (
                    <>
                      <div style={{ marginBottom: '10px' }}>历史对话:</div>
                      <ProFormSwitch
                        noStyle
                        checkedChildren={item.checkedChildren}
                        unCheckedChildren={item.unCheckedChildren}
                        width="md"
                        required={true}
                        name={item.name}
                        label={item.label}
                      />
                      <>
                        <div style={{ marginBottom: '16px' }}></div>
                      </>
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
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
                <span style={{marginLeft: '10px'}}></span>
                <Button htmlType="reset">重置</Button>
                <span style={{marginLeft: '10px'}}></span>
                <Button type={'primary'} onClick={() => {
                  onCreate()
                }}>创建</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="助手调试" style={{minHeight: '88vh', position: "relative"}}>
            <Col span={24}>
                {/*助手信息*/}
                <div style={{
                  width: '100%',
                  height: '80vh',
                  overflowY: 'auto',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'red blue'
                }} ref={scrollDomRef}>
                  <div className="margin-16" />
                  {/* 渲染历史对话 */}
                  <div>
                    <Space direction="horizontal">
                      <img src={'/model.png'} style={{width: '30px'}}/>
                      <div style={{marginTop: '5px',padding: '10px' , background: '#f4f6f8', borderRadius: '10px'}}>{'你好，我是你的编程助手'}</div>
                    </Space>
                    <div className="margin-16" />
                  </div>

                  {
                    chatRecord?.map(item => (
                      <>
                        <div>
                          <Space direction="horizontal">
                            {item.chatRole == 0 && <>
                              <img src={currentUser?.userAvatar} style={{width: '30px',borderRadius: '50%'}}/>
                              <div style={{marginTop: '5px',padding: '10px' , background: '#e7f7ff', borderRadius: '10px'}}>{item.content}</div>
                            </>}
                            {item.chatRole == 1 && <>
                              <img src={'/model.png'} style={{width: '30px'}}/>
                              <div style={{marginTop: '5px',padding: '10px' , background: '#f4f6f8', borderRadius: '10px'}}><OmsViewMarkdown textContent={item.content ?? ''} darkMode></OmsViewMarkdown></div>
                            </>}
                          </Space>
                          <div className="margin-16" />
                        </div>
                      </>
                    ))
                  }
                </div>

                <div style={{position: "fixed", bottom: '10vh', width: '40%'}}>
                  <Input
                    placeholder="请输入内容"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value)
                    }}
                    onPressEnter={(e) => {
                      sendQuestion()
                    }}
                    suffix={
                      <>
                        {
                          !submitting && <a><img src={'/send.png'} style={{width: '24px'}}/></a>
                        }
                        {
                          submitting && <Spin indicator={antIcon} />
                        }
                      </>
                    }
                  />
                </div>
            </Col>
          </Card>
        </Col>
      </Row>

    </div>
  );
};
export default UserAddAssistant;
