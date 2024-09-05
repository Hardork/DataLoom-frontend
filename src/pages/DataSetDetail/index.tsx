import React, {useEffect, useState} from 'react';
import {Layout, Input, Table, Select, Menu, Button, message, Tabs, TabsProps, Row, Col, Card} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import {ProTable} from "@ant-design/pro-components";
import TextArea from "antd/es/input/TextArea";
import {useParams} from "react-router";
import {getSchemas, previewData} from "@/services/DataLoom/dataSourceController";
import ProCard from "@ant-design/pro-card";
import {listUserDataSource} from "@/services/DataLoom/coreDataSourceController";

const { Content, Sider } = Layout;

const MyLayout = () => {

  const params = useParams();
  const [items, setItems] = useState<[]>()
  const [selectTableName, setSelectTableName] = useState<string>();
  const [dataList, setDataList]  = useState<Record<string, any>[]>()
  const [datasources, setDatasources]  = useState<API.CoreDatasource[]>()
  const [fieldList, setFieldList]  = useState<Record<string, any>[]>()
  const [columns, setColumns] = useState([])
  const [dimension, setDimension] = useState<Record<string, any>[]>()
  const [measure, setMeasure] = useState<Record<string, any>[]>()

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

  const fetchUserDatasource = async () => {
    const res = await listUserDataSource();
    if (res.code === 0) {
      setDatasources(res.data)
    }
  }

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

  const fetchPreviewData = async (tableName : string) => {
    const res = await previewData({
      datasourceId: params.id,
      dataName: tableName
    })
    if (res.data) {
      setDataList(res.data.data)
      setFieldList(res.data.field)
      const newDismension = []
      const newMeasure = []
      // 设置数据表字段
      const newColumns = res.data.field.map(item => {
        if (fieldIsMeasure(item.type ?? '')) {
          newMeasure.push(item)
        } else {
          newDismension.push(item)
        }
        return {
          key: item.columnName,
          title: item.comment === '' ? item.columnName : item.comment,
          dataIndex: item.columnName,
          width: 20
        }
      })
      // 设置维度和度量
      setDimension(newDismension)
      setMeasure(newMeasure)
      setColumns(newColumns)
      console.log(res.data)
    } else {
      message.error(res.message)
    }
  }

  useEffect(() => {
    fetchSchemas()
  }, []);


  const onChange = (key: string) => {
    console.log(key);
  };

  const [sql, setSql] = useState('');
  const [tableData, setTableData] = useState(dataSource);
  const [loading, setLoading] = useState(false);

  const executeSQL = async () => {
    setLoading(true);
    try {
      // 这里执行SQL查询
      // 示例：假设你有一个后端API接口来执行SQL查询并返回结果
      const response = await fetch('/api/execute-sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sql }),
      });

      if (response.ok) {
        const result = await response.json();
        setTableData(result.data); // 假设API返回的数据格式为 { data: [...] }
        message.success('查询成功');
      } else {
        message.error('查询失败');
      }
    } catch (error) {
      console.error('执行SQL查询时出错:', error);
      message.error('执行SQL查询时出错');
    } finally {
      setLoading(false);
    }
  };

  const tableItems: TabsProps['items'] = [
    {
      key: '1',
      label: '表结构',
      children: <>
        <ProCard
          split={'vertical'}
          bordered
          headerBordered
        >
          <ProCard title="维度" colSpan="50%" headerBordered headStyle={{background: '#F5F6F7'}}>
            <div>
              <Table columns={fieldModelColumns} dataSource={dimension} pagination={false} showHeader={false}></Table>
            </div>
          </ProCard>
          <ProCard title="度量" headerBordered headStyle={{background: '#F5F6F7'}}>
            <div>
              <Table columns={fieldModelColumns} dataSource={measure} pagination={false} showHeader={false}></Table>
            </div>
          </ProCard>
        </ProCard>
      </>,
    },
    {
      key: '2',
      label: '数据预览',
      children: <>
        <ProTable
                  virtual
                  scroll={{ x: 1000, y: 600 }} dataSource={dataList} columns={columns} pagination={false} search={false}/>
      </>
    },
    {
      key: '3',
      label: '自定义SQL查询',
      children: <>
        <h3>自定义SQL查询</h3>
        <TextArea
          rows={4}
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          placeholder="输入你的SQL查询语句"
          style={{marginBottom: 16}}
        />
        <Button type="primary" onClick={executeSQL} loading={loading}>
          执行SQL
        </Button>
      </>,
    }
  ];





  return (
    <Layout style={{ minHeight: '100vh' ,margin: '-32px -40px'}}>
      <Sider width={250} style={{ background: '#fff' }}>

        <div style={{padding: '16px'}}>
          <h4 style={{paddingBottom: '10px', paddingTop: '20px'}}>数据源</h4>
          <Input placeholder={'搜索'} addonBefore={<SearchOutlined/>}></Input>
        </div>

        <div style={{overflow: 'auto', padding: '16px' }}>
          <Menu
            style={{ width: '100%' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            onClick={(record) => {
              fetchPreviewData(record.key)
              setSelectTableName(record.key)
            }}
            mode="inline"
            items={items}
          />
        </div>
      </Sider>
      <Layout >
        <Content style={{ marginLeft: '10px', overflow: 'initial'}}>
          <div style={{padding: 24, background: '#fff', minHeight: '100vh'}}>
            <Tabs defaultActiveKey="1" items={tableItems} onChange={onChange} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
