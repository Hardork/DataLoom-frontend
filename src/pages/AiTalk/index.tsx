import {Button, Card, Col, Form, message, Row, Space} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useEffect, useState} from 'react';
import {useForm} from "antd/es/form/Form";
import WebSocketComponent from "@/components/WebSocket";
import {useModel} from "@@/exports";
import AiWebSocket from "@/components/WebSocket/AiWebSocket";
import {getAiTalk} from "@/services/DataLoom/aiController";
import OmsViewMarkdown from "@/components/OmsViewMarkdown";

/**
 * 添加图表页面
 * @constructor
 */
const AiTalk: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [result, setResult] = useState('')

  const [msg, setMsg] = useState({
    title: undefined,
    description: undefined,
    chartId: undefined,
    type: undefined
  })


  useEffect(() => {
    const handleMessage = (event:any) => {
      // 处理收到的消息
      console.log('收到消息：', event.data);
      const res = JSON.parse(event.data)
      if (res.type === 'end') { //结束会话
        setSubmitting(false);
      } else {
        setResult(result => result + res.content)
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


  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 清空上一次的内容
    setResult('')
    if (values.text === '') {
      message.info('请先输入内容')
      return;
    }
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    // 对接后端，上传数据
    const params = {
      ...values
    };
    try {
      const res = await getAiTalk(params);
      if (!res?.data) {
        message.error('分析失败, ' + res.message);
      }
    } catch (e: any) {
      message.error('分析失败，' + e.message);
    }
  };

  return (
    <div className="add-chart">
      <WebSocketComponent userId={currentUser?.id}></WebSocketComponent>
      <AiWebSocket></AiWebSocket>
      <Row gutter={24}>
        <Col span={12}>
          <Card title="AI助手">
            <Form name="addChart" labelAlign="left" labelCol={{ span: 4 }}
                  wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{}}>
              <Form.Item
                name="text"
                label="提问:"
                rules={[{ required: true, message: '请输入分析目标' }]}
              >
                <TextArea placeholder="请输入你的问题，比如：今天天气怎么样? 提问一次消耗1积分" />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                <Space>
                  <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="助手回答">
            <OmsViewMarkdown textContent={result} darkMode></OmsViewMarkdown>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AiTalk;
