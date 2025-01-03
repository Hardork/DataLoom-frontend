import { UploadOutlined } from '@ant-design/icons';
import {Button, Card, Col, Form, Input, message, Row, Select, Space, Upload} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useState} from 'react';
import {useForm} from "antd/es/form/Form";
import WebSocketComponent from "@/components/WebSocket";
import {useModel} from "@@/exports";

/**
 * 添加图表页面
 * @constructor
 */
const AddChartAsync: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};


  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {

  };

  return (
    <div className="add-chart">
      <WebSocketComponent userId={currentUser?.id}></WebSocketComponent>
      <Row gutter={24}>
        <Col span={24}>
          <Card title="智能分析">
            <Form form={form} name="addChart" labelAlign="left" labelCol={{ span: 4 }}
                  wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{}}>
              <Form.Item
                name="goal"
                label="分析目标"
                rules={[{ required: true, message: '请输入分析目标' }]}
              >
                <TextArea placeholder="请输入你的分析需求，比如：分析网站用户的增长情况" />
              </Form.Item>
              <Form.Item name="name" label="图表名称">
                <Input placeholder="请输入图表名称" />
              </Form.Item>
              <Form.Item name="chartType" label="图表类型">
                <Select
                  options={[
                    { value: '折线图', label: '折线图' },
                    { value: '柱状图', label: '柱状图' },
                    { value: '堆叠图', label: '堆叠图' },
                    { value: '饼图', label: '饼图' },
                    { value: '雷达图', label: '雷达图' },
                  ]}
                />
              </Form.Item>
              <Form.Item name="file" label="原始数据">
                <Upload name="file" maxCount={1}>
                  <Button icon={<UploadOutlined />}>上传 CSV 文件</Button>
                </Upload>
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

      </Row>
    </div>
  );
};
export default AddChartAsync;
