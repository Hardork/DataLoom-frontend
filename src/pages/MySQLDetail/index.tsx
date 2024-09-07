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
  Card, Tag, Button, Drawer, Steps, Form
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
  const [apiVaild, setApiVaild] = useState<boolean>(true)
  const [current, setCurrent] = useState(0);

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
      setApiVaild(true)
    } else
      message.error(res.message)
    setApiVaild(false)
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
        closable={false}
        onClose={onClose}
        open={open}
        height="80%"
      >
        <div style={{
          display: "flex",
          flexDirection: "column",  // 使内容垂直排列
          alignItems: "center",     // 居中对齐
          justifyContent: "center", // 水平居中
          height: "100%"            // 让子元素占满整个Drawer的高度
        }}>
          <Steps current={current} items={steps} size="small" style={{ width: "40%" }} />

          <div>
            <Form style={{marginTop: "20px" }} layout="vertical">
              <Form.Item
                label="数据源名称"
                name="name"
                rules={[{ required: true, message: '请输入数据源名称' }]}
              >
                <Input style={{width: "60em"}}/>
              </Form.Item>

              <Form.Item
                label="描述"
                name="description"
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <Input.TextArea style={{height: "5em"}} showCount maxLength={100}/>
              </Form.Item>
            </Form>
          </div>

          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                下一步
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                上一步
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                保存
              </Button>
            )}
          </div>
        </div>
      </Drawer>

    </Layout>
  );
};

export default MyLayout;
