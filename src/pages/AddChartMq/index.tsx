import {
  genChartByAiAsyncMqV3, genChartByAiWithDataAsyncMq,
} from '@/services/DataLoom/chartController';
import {FileExcelOutlined, UploadOutlined} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Drawer, DrawerProps,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Tag,
  Upload
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState} from 'react';
import {useForm} from "antd/es/form/Form";
import WebSocketComponent from "@/components/WebSocket";
import {history, useModel} from "@@/exports";
import moment from "moment";



/** Title: 前置水印 */
import {ProColumns, ProList} from '@ant-design/pro-components';
import {
  ProTable,
} from '@ant-design/pro-components';
import {listUserDataInfo} from "@/services/DataLoom/dataController";


export interface TableListItem {
  key: number;
  date: string;
  visit: number;
  sale: number;
  register: number;
}
const tableListDataSource: TableListItem[] = [];

for (let i = 1; i <= 9; i += 1) {
  tableListDataSource.push({
    key: i,
    date: '2024-01-0' + i,
    visit: Math.floor(Math.random() * 1000),
    sale: Math.floor(Math.random() * 10000),
    register: Math.floor(Math.random() * 100)
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '日期',
    width: 80,
    dataIndex: 'date'
  },
  {
    title: '销售额',
    dataIndex: 'sale',
    width: 80
  },
  {
    title: '访问量',
    width: 80,
    dataIndex: 'visit'
  },
  {
    title: '注册用户数',
    dataIndex: 'register',
    width: 80,

  }
];

/**
 * 添加图表页面
 * @constructor
 */
const AddChartMq: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [dataType, setDataType] = useState<string>('data')
  const [userDataInfo, setUserDataInfo] = useState<API.UserData[]>()
  const [data, setData] = useState([])
  const [ghost, setGhost] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<API.UserData>()
  const [cardActionProps, setCardActionProps] = useState<'actions' | 'extra'>(
    'extra',
  );

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  const showDrawer = async () => {
    // 请求用户数据集数据
    const res = await listUserDataInfo();
    if (res.code === 0) { // 请求成功
      setUserDataInfo(res.data);
      const t = res.data?.map((item) => ({
        title: item.dataName,
        record: item,
        subTitle: <Tag color="#5BD8A6">Excel</Tag>,
        actions: [<a key="run" onClick={() => {
          history.push('/add_chart_data/' + item.id)
        }}>查看</a>],
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        content: (
          <div
            style={{
              flex: 1,
            }}
          >
            <div
              style={{
                width: 300,
              }}
            >
              <div>
                <p>描述:{item.description?.length === 0 ? '暂无描述' : item.description}</p>
                <p>更新时间:{moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p>创建时间:{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</p>
              </div>
            </div>
          </div>
        ),
      }));
      setData(t)
    }
    setOpen(true);
  };


  const onClose = () => {
    setOpen(false);
  };


  const handleChange = (value : string) => {
    setDataType(value);
  };



  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);

    if (dataType === 'file') {
      // 对接后端，上传数据
      const params = {
        ...values,
        file: undefined,
      };
      try {
        // 根据不同的选择访问不同的接口
        const res = await genChartByAiAsyncMqV3(params, {}, values.file.file.originFileObj);
        if (!res?.data) {
          message.error('分析失败, ' + res.message);
        } else {
          message.success('分析成功, 稍后请在历史分析中查看分析结果');
          form.resetFields();
        }
      } catch (e: any) {
        message.error('分析失败，' + e.message);
      }
    } else if (dataType === 'data') {
      const params = {
        ...values,
        file: undefined,
        dataId: selectData?.id
      };
      try {
        // 根据不同的选择访问不同的接口
        const res = await genChartByAiWithDataAsyncMq(params);
        if (!res?.data) {
          message.error('分析失败, ' + res.message);
        } else {
          message.success('分析成功, 稍后请在历史分析中查看分析结果');
          form.resetFields();
        }
      } catch (e: any) {
        message.error('分析失败，' + e.message);
      }
    }

    setSubmitting(false);
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
                <Select
                  defaultValue="data"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: 'data', label: '数据集上传' },
                    { value: 'file', label: '文件上传' },
                  ]}
                />
                <div style={{
                  padding:'10px'
                }}></div>
                {
                  dataType === 'file' ? <>
                    <Upload name="file" maxCount={1}>
                    <Button icon={<UploadOutlined/>}>上传 XLSX 文件</Button>
                  </Upload></> : <>
                    <Button icon={<UploadOutlined/>} onClick={() => {
                      // 显示数据集
                      showDrawer()
                    }}>选择数据集</Button>
                    {selectData !== undefined && (<>
                      <div style={{
                        paddingTop: '10px'
                      }}>
                        <FileExcelOutlined />
                        {'：' + selectData.dataName}
                      </div>
                    </>)}
                  </>
                }
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
      <Card>
        <ProTable<TableListItem>
          columns={columns}
          dataSource={tableListDataSource}
          rowKey="key"
          toolbar={{
            title: 'XLSX文件示例',
            multipleLine: true
          }}
          search={false}
          dateFormatter="string"
        />
      </Card>
      <Drawer
        title="选择数据集"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>退出</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <ProList<any>
          ghost={ghost}
          itemCardProps={{
            ghost,
          }}
          pagination={{
            defaultPageSize: 8,
            showSizeChanger: false,
          }}
          showActions="hover"
          // rowSelection={{}}
          grid={{ gutter: 16, column: 1 }}
          onItem={(record: any) => {
            return {
              onClick: () => {
                // 选择当前id
                setSelectData(record.record)
              },
            };
          }}
          rowSelection={{
            type: 'radio'
          }}
          metas={{
            title: {},
            subTitle: {},
            type: {},
            avatar: {},
            content: {},
            actions: {
              cardActionProps,
            },
          }}
          dataSource={data}
        />
      </Drawer>
    </div>
  );
};
export default AddChartMq;
