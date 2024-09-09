import React, {useEffect, useState} from 'react';
import {
  Layout,
  Input,
  Menu,
  message,
  Tabs,
  TabsProps,
  Descriptions,
  DescriptionsProps,
  Row,
  Col,
  Card, Tag, Button, Drawer, Steps, Form, Select, InputNumber, Dropdown, DatePicker
} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import {ProTable} from "@ant-design/pro-components";
import {useParams} from "react-router";
import {getSchemas} from "@/services/DataLoom/dataSourceController";
import ProCard from "@ant-design/pro-card";
import {checkDatasource, getDataSource, listUserDataSource} from "@/services/DataLoom/coreDataSourceController";
import {json} from "express";
import {getByDatasource} from "@/services/DataLoom/coreDatasetTableController";
import {Buffer} from "memfs/lib/internal/buffer";
import {Radio} from 'antd/lib';
import Cron from 'antd-cron';

const {Content, Sider} = Layout;


const MyLayout = () => {

  const params = useParams();
  const [items, setItems] = useState<[]>()
  const [selectDatasource, setSelectDatasource] = useState<string>();
  const [datasource, setDatasource] = useState<API.DatasourceDTO>()
  const [configuration, setConfiguration] = useState<null>()
  const [dataList, setDataList] = useState<Record<string, any>[]>()
  const [datasources, setDatasources] = useState<[]>()
  const [fieldList, setFieldList] = useState<Record<string, any>[]>()
  const [columns, setColumns] = useState([])
  const [dimension, setDimension] = useState<Record<string, any>[]>()
  const [measure, setMeasure] = useState<Record<string, any>[]>()
  const [ApiDefinition, setApiDefinition] = useState<Record<string, any>[]>()
  const [DatasourceTask, setDatasourceTask] = useState<Record<string, any>>()
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [updateFrequency, setUpdateFrequency] = useState('RIGHTNOW');
  const [updateType, setUpdateType] = useState('all_scope');
  const [form] = Form.useForm()

  useEffect(() => {
    // 在数据获取后，设置表单的初始值
    if (datasource) {
      // form.setFieldsValue(datasource)
      form.setFieldsValue({ name: '测试名称', description: '测试描述' })
    }
  }, [datasource, form])

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const mysqlDatasourceConfItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '数据源名称',
      children: datasource?.name,
    },
    {
      key: '2',
      label: '类型',
      children: datasource?.type,
    },
    {
      key: '3',
      label: '描述',
      children: datasource?.description,
    },
    {
      key: '4',
      label: '主机地址',
      children: configuration?.host,
    },
    {
      key: '5',
      label: '端口',
      children: configuration?.port,
    },
    {
      key: '6',
      label: '库名',
      children: configuration?.dataBaseName,
    }
  ];

  const apiDatasourceConfItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '数据源名称',
      children: datasource?.name,
    },
    {
      key: '2',
      label: '类型',
      children: datasource?.type,
    },
    {
      key: '3',
      label: '描述',
      children: datasource?.description,
    },
  ];

  const fieldModelColumns = [
    {
      title: '列名',
      key: 0,
      dataIndex: 'columnName'
    },
    {
      title: '注释',
      key: 1,
      dataIndex: 'comment'
    }
  ]

  const steps = [
    {
      title: '数据源配置信息',
      content: 'First-content',
    },
    {
      title: '数据更新设置',
      content: 'Second-content',
    },
  ];

  const handleUpdateFrequencyChange = e => {
    setUpdateFrequency(e.target.value);
  };

  const fetchUserDatasource = async () => {
    const res = await listUserDataSource();
    if (res.code === 0) {
      const eles = []
      res.data.forEach(item => eles.push({
        key: item.id,
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
        </>
      }))
      setDatasources(eles)

    }
  }

  const getDatasourceById = async (id) => {
    const res = await getDataSource({datasourceId: id})
    if (res.code === 0) {
      setDatasource(res.data)
      // @ts-ignore
      if (res.data.type === 'mysql') {
        setConfiguration(JSON.parse(res.data.configuration))
      } else if (res.data.type === 'api') {
        setApiDefinition(JSON.parse(res.data.configuration))
        await getTaskByDatasource(selectDatasource)
      }
    }
  }

  const getTaskByDatasource = async (id) => {
    const res = await getByDatasource({datasourceId: id})
    if (res.code === 0) {
      setDatasourceTask(res.data)
    }
  }

  const checkDs = async (DatasourceDTO) => {
    const res = await checkDatasource(DatasourceDTO)
    if (res.data === true) {
      message.success('接口校验成功')
    } else {
      message.error(res.message)
    }
    getDatasourceById(DatasourceDTO?.id)
  }

  const openEdit = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false);
  };

  const fetchSchemas = async () => {
    const res = await getSchemas({id: params.id})
    if (res.data) {
      const eles = []
      res.data.forEach(item => eles.push({
        key: item,
        label: item
      }))
      // @ts-ignore
      setItems(eles)
    } else {
      message.error(res.message)
    }
  }

  const fieldIsMeasure = (field: string) => {
    if (field === 'BIGINT' || field === 'TINYINT' || field === 'TEXT') {
      return true;
    }
    return false
  }


  useEffect(() => {
    fetchUserDatasource()
  }, []);

  useEffect(() => {
    getDatasourceById(selectDatasource)
  }, [selectDatasource]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const tableItems: TabsProps['items'] = [
    {
      key: '1',
      label: '数据源信息',
      children: <>
        <ProCard title="配置信息" headerBordered headStyle={{background: '#F5F6F7'}}>
          <div>
            {
              datasource?.type === 'mysql' &&
              <Descriptions title="MySQL数据源配置" layout="vertical" items={mysqlDatasourceConfItems}/>
            }
            {
              datasource?.type === 'api' &&
              <Descriptions title="API数据源配置" layout="vertical" items={apiDatasourceConfItems}/>
            }
          </div>
        </ProCard>
        {
          datasource?.type === 'api' &&
          <ProCard title="数据表" headerBordered headStyle={{background: '#F5F6F7'}}>
            <Row gutter={[16, 8]}>
              {ApiDefinition?.map((item, index) => (
                <Col span={12} key={index}>
                  <Card title={
                    <div>
                      {item.name} {item.status === 'success' ? <Tag color="success">有效</Tag> :
                      <Tag color="error">失效</Tag>}
                    </div>}
                  >
                    <div style={{marginBottom: 8}}>
                      <strong style={{display: 'inline-block', width: 120}}>数据时间:</strong>
                      <span>{item.updateTime}</span>
                    </div>
                    <div style={{marginBottom: 8}}>
                      <strong style={{display: 'inline-block', width: 120}}>请求方式:</strong>
                      <span>{item.method}</span>
                    </div>
                    <div style={{marginBottom: 8}}>
                      <strong style={{display: 'inline-block', width: 120}}>URL:</strong>
                      <span>{item.url}</span>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </ProCard>
        }
        {
          datasource?.type === 'api' &&
          <ProCard title="更新设置" headerBordered headStyle={{background: '#F5F6F7'}}>
            <div style={{marginBottom: 8}}>
              <strong style={{display: 'inline-block', width: 120}}>更新方式:</strong>
              <span>{DatasourceTask?.updateType}</span>
            </div>
            <div style={{marginBottom: 8}}>
              <strong style={{display: 'inline-block', width: 120}}>执行频率:</strong>
              <span>{DatasourceTask?.syncRate}</span>
            </div>
            {
              DatasourceTask?.updateType !== 'RIHGTNOW' &&
              <div>
                <div style={{marginBottom: 8}}>
                  <strong style={{display: 'inline-block', width: 120}}>表达式设定:</strong>
                  <span>{DatasourceTask?.cron}</span>
                </div>
                <div style={{marginBottom: 8}}>
                  <strong style={{display: 'inline-block', width: 120}}>开始时间:</strong>
                  <span>{DatasourceTask?.startTime}</span>
                </div>
                <div style={{marginBottom: 8}}>
                  <strong style={{display: 'inline-block', width: 120}}>结束时间:</strong>
                  <span>{DatasourceTask?.endTime}</span>
                </div>
              </div>
            }
          </ProCard>
        }
      </>,
    },
    {
      key: '2',
      label: '数据源表',
      children: <>
        <ProTable
          virtual
          scroll={{x: 1000, y: 600}} dataSource={dataList} columns={columns} pagination={false} search={false}/>
      </>
    }
  ];


  return (
    <Layout style={{minHeight: '100vh', margin: '-32px -40px'}}>
      <Sider width={250} style={{background: '#fff'}}>

        <div style={{padding: '16px'}}>
          <h4 style={{paddingBottom: '10px', paddingTop: '20px'}}>数据源</h4>
          <Input placeholder={'搜索'} addonBefore={<SearchOutlined/>}></Input>
        </div>

        <div style={{overflow: 'auto', padding: '16px'}}>
          <Menu
            style={{width: '100%'}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            onClick={(record) => {
              setSelectDatasource(record.key)
            }}
            mode="inline"
            items={datasources}
          />
        </div>
      </Sider>
      <Layout>
        <Content style={{marginLeft: '10px', overflow: 'initial'}}>
          <div style={{padding: 24, background: '#fff', minHeight: '100vh', position: 'relative'}}>
            <Button type="primary"
                    style={{position: 'absolute', right: '25px', width: "80px", height: "35px", zIndex: 2}}
                    onClick={() => {
                      openEdit()
                    }}>
              编辑
            </Button>
            <Button type="default"
                    style={{position: 'absolute', right: '120px', width: "80px", height: "35px", zIndex: 2}}
                    onClick={() => {
                      checkDs(datasource)
                      getDatasourceById(datasource?.id)
                    }}>
              校验
            </Button>
            <Tabs defaultActiveKey="1" items={tableItems} onChange={onChange}/>
          </div>
        </Content>
      </Layout>
      <Drawer
        title="编辑数据源"
        placement="bottom"
        // closable={false}
        onClose={onClose}
        open={open}
        height="90%"
      >
        {datasource?.type === 'api' && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",  // 确保内容从顶部开始显示
            height: "100%",
            overflowY: "auto"
          }}>
            <Steps current={current} items={steps} size="small" style={{width: "40%"}}/>
            {/* 当current为0时，同时显示基础信息和数据表 */}
            {current === 0 && (
              <>
                <ProCard
                  title="基础信息"
                  headerBordered
                  style={{
                    width: "80%",  // 缩小宽度
                  }}
                >
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <div>
                      <Form layout="vertical" form={form}>
                        <Form.Item
                          label="数据源名称"
                          name="name"
                          rules={[{required: true}]}
                        >
                          <Input style={{width: "40em"}}/> {/* 缩小输入框宽度 */}
                        </Form.Item>

                        <Form.Item
                          label="描述"
                          name="description"
                          rules={[{required: true, message: '请输入描述信息'}]}
                        >
                          <Input.TextArea style={{height: "4em"}} showCount maxLength={100}/> {/* 缩小文本框高度 */}
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </ProCard>

                <ProCard
                  title="数据表"
                  headerBordered
                  style={{
                    width: "80%",  // 缩小宽度
                  }}
                >
                  <Row gutter={[8, 8]}>  {/* 减少列间距 */}
                    {ApiDefinition?.map((item, index) => (
                      <Col span={12} key={index}>
                        <Card title={
                          <div>
                            {item.name} {item.status === 'success' ? <Tag color="success">有效</Tag> :
                            <Tag color="error">失效</Tag>}
                          </div>
                        }>
                          <div style={{marginBottom: 6}}>  {/* 减少底部间距 */}
                            <strong style={{display: 'inline-block', width: 100}}>数据时间:</strong>
                            <span>{item.updateTime}</span>
                          </div>
                          <div style={{marginBottom: 6}}>  {/* 减少底部间距 */}
                            <strong style={{display: 'inline-block', width: 100}}>请求方式:</strong>
                            <span>{item.method}</span>
                          </div>
                          <div style={{marginBottom: 6}}>  {/* 减少底部间距 */}
                            <strong style={{display: 'inline-block', width: 100}}>URL:</strong>
                            <span>{item.url}</span>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </ProCard>
              </>
            )}
            {current === 1 && (
              <>
                <ProCard
                  title="数据更新设置"
                  headerBordered
                  style={{
                    width: "90%",
                    marginTop: 10,
                    padding: 16,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    overflow: "visible"
                  }}
                >
                  <div>
                    <div>
                      <Form layout="vertical">
                        <Form.Item label="更新方式" required={true} >
                          <Radio.Group onChange={e => setUpdateType(e.target.value)} value={updateType}>
                            <Radio value="all_scope">全量更新</Radio>
                            <Radio value="add_scope">增量更新</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item label="更新频率" required={true}>
                          <Radio.Group onChange={handleUpdateFrequencyChange} value={updateFrequency}>
                            <Radio value="RIGHTNOW">立即更新</Radio>
                            <Radio value="CRON">表达式设定</Radio>
                            <Radio value="SIMPLE_CRON">简单重复</Radio>
                          </Radio.Group>
                        </Form.Item>

                        {/* 当选择 "CRON" 时显示表达式输入框 */}
                        {updateFrequency === 'CRON' && (
                          <div>
                            <Form.Item label="CRON 表达式">
                              {/*TODO 修改为CRON组件*/}
                              <Input></Input>
                            </Form.Item>
                            <Form.Item label="开始时间" required={true}>
                              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>
                            <Form.Item label="结束时间">
                              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>
                          </div>

                        )}

                        {/* 当选择 "SIMPLE_CRON" 时显示自定义选择框 */}
                        {updateFrequency === 'SIMPLE_CRON' && (
                          <div>
                            <Form.Item label="更新频率" required={true}>
                              <Input.Group compact>
                                每
                                <InputNumber
                                  style={{
                                    width: '10%',
                                    marginLeft: '8px',  // 增加左边距
                                    marginRight: '8px'  // 增加右边距
                                  }}
                                  placeholder="每多少"
                                />
                                <Select
                                  defaultValue="小时"
                                  style={{
                                    width: '10%',
                                    marginLeft: '8px',  // 增加左边距
                                    marginRight: '8px'  // 增加右边距
                                  }}
                                >
                                  <Option value="second">秒</Option>
                                  <Option value="minute">分钟</Option>
                                  <Option value="hour">小时</Option>
                                  <Option value="day">天</Option>
                                  <Option value="week">周</Option>
                                  <Option value="month">月</Option>
                                </Select>
                                更新一次
                              </Input.Group>
                            </Form.Item>
                            <Form.Item label="开始时间" required={true}>
                              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>
                            <Form.Item label="结束时间">
                              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>
                          </div>

                        )}
                      </Form>
                    </div>
                  </div>

                </ProCard>
              </>
            )}

            <div style={{marginTop: 24}}>
              {current < steps.length - 1 && (
                <Button type="primary" onClick={next}>
                  下一步
                </Button>
              )}
              {current > 0 && (
                <Button style={{margin: '0 8px'}} onClick={prev}>
                  上一步
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('处理完成！')}>
                  保存
                </Button>
              )}
            </div>
          </div>
        )}


      </Drawer>
    </Layout>
  )
    ;
};

export default MyLayout;
