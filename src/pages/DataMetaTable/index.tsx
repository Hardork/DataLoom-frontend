import {
  CheckCard, FormInstance,
  ProFormText, ProFormTextArea,
  ProList, ProTable, StepsForm,
} from '@ant-design/pro-components';
import {
  Avatar,
  Button, Card,
  Divider,
  Flex,
  Input, List,
  message,
  Modal,
  notification,
  Popover,
  Select, Space,
  Switch,
  Tag, Tooltip,
  Upload
} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {
  deleteUserDataUsingPost, getDataCollaboratorsUsingGet,
  listUserDataInfoUsingGet, previewAndCheckExcelInfoUsingPost, shareUserDataUsingPost,
  uploadFileToMongoUsingPost
} from "@/services/hwqbi/dataController";
import moment from "moment";
import {history} from "@@/core/history";
import {RcFile, UploadProps} from "antd/es/upload/interface";
import {
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  DashboardOutlined,
  FileOutlined, FileTextOutlined,
  InboxOutlined,
  NumberOutlined
} from '@ant-design/icons';
import {useModel} from "@@/exports";
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  checkConnectUsingPost,
  saveDataSourceMetaInfoUsingPost
} from "@/services/hwqbi/dataSourceController";
import { AES_Encrypt } from '../../utils/AES'





export default () => {

  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [originalData, setOriginalData] = useState<API.UserData[]>()
  const [showDeleteOpen, setShowDeleteOpen] = useState(false)
  const [data, setData] = useState<[]>()
  const [change, setChange] = useState(false)
  const [shareLink, setShareLink] = useState<string>();
  const [api, contextHolder] = notification.useNotification();
  const [shareDataId, setShareDataId] = useState<any>()
  const [loading, setLoading] = useState(true)
  // const []


  const openNotification = (link) => {
    navigator.clipboard.writeText(link);
    message.success('复制链接成功')
  };

  const warning = async (record) => {
    Modal.confirm({
      title: '删除数据集',
      content: '删除数据集后，系统不提供数据恢复的功能，确认删除吗？',
      onOk: async () => {
        const res = await deleteUserDataUsingPost({id : record.id})
        if (res.code === 0) {
          message.success('删除成功')
          setChange(!change)
        } else {
          message.error('删除失败')
          setChange(!change)
        }
      }
    });
  };

  const text = <span style={{padding: '10px'}}>数据协作者</span>;

  const getShareLink = async (id : string | undefined, permission : number)=> {
      setLoading(true)
    try {
      const res = await shareUserDataUsingPost({ id, permission });
      if (res.code === 0) {
        setShareLink(res.data);
        return res.data;
      } else {
        message.error('获取链接失败');
      }
    } catch (error) {
      console.error('获取链接出错：', error);
      message.error('获取链接失败');
    } finally {
      setLoading(false);
    }
    return null;
  }

  const content = (item) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ link, setLink] = useState<string>('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ dataCollaborators, setDataCollaborators] = useState<API.DataCollaboratorsVO[]>([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ dataLoading, setDataLoading] = useState<boolean>()
    const getShareLinkInner = async ()=> {
      try {
        const res = await shareUserDataUsingPost({ id : item.id, permission: 0 });
        if (res.code === 0) {
          // @ts-ignore
          setLink(res.data)
        } else {
          message.error('获取链接失败');
        }
      } catch (error) {
        console.error('获取链接出错：', error);
        message.error('获取链接失败');
      }
      return null;
    }

    const getDataCollaborators = async () => {
      if (dataLoading) {
        return;
      }
      setDataLoading(true)
      try {
        const res = await getDataCollaboratorsUsingGet({dataId: item.id});
        if (res.code === 0) {
          // @ts-ignore
          setDataCollaborators(res.data)
        } else {
          message.error('获取协作者失败');
        }
      } catch (error) {
        console.error('获取协作者失败：', error);
        message.error('获取协作者失败');
      } finally {
        setDataLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      getShareLinkInner()
      getDataCollaborators()
    }, []);
    return (
      <div style={{width: '480px', padding: '10px'}}>
        <div style={{marginTop: '10px'}}>
          <Flex vertical gap={12}>
            <Input placeholder="输入用户名邀请协作"/>
          </Flex>
        </div>
        <div style={{
          width: '100%',
          padding: '50px 0 10px'
        }}>

          {
            dataCollaborators.length === 0 ?
              <>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center ",
                  textAlign: "center",
                  alignItems: "center"
                }}>
                  <img src="https://gw.alipayobjects.com/mdn/prod_resou/afts/img/A*aSg9SJR6isIAAAAAAAAAAAAAARQnAQ"
                       style={{width: '20%'}}/>
                  <div style={{padding: '20px 0 15px'}}>
                    <p style={{color: '#8A8F8D'}}>暂无数据协作者</p>
                  </div>
                </div>
              </>
              :
              <>
                <Card
                  id="scrollableDiv"
                  style={{
                    height: 200,
                    overflow: 'auto',
                    padding: '0 8x',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                  }}
                >
                  <InfiniteScroll
                    dataLength={dataCollaborators.length}
                    next={getDataCollaborators}
                    hasMore={dataCollaborators.length < 50}
                  loader={<></>}
                  endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                  scrollableTarget="scrollableDiv"
                >
                  <List
                    dataSource={dataCollaborators}
                    renderItem={(item:API.DataCollaboratorsVO) => (
                      <List.Item key={item.userVO?.id}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.userVO?.userAvatar}/>}
                          title={<a href="https://ant.design">{item.permission === 0 ? '可阅读' : '可编辑'}</a>}
                          description={item.userVO?.userName}
                        />
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </Card>
            </>
          }
        </div>
        <Divider></Divider>
        <div>
          设置协作者权限
        </div>
        <div style={{
          paddingTop: '10px'
        }}>
          <CheckCard.Group
            onChange={async (value) => {
              console.log(item.id, value)
              if (value === undefined) {
                return;
              }
              const res = await getShareLink(item.id, value)
              if (res !== null) setLink(res);
            }}
            defaultValue={0}
          >
            <CheckCard title="可阅读" description="协作者仅拥有读权限" value={0} size={'small'}/>
            <CheckCard title="可编辑" description="协作者拥有数据的编辑权限" value={1} size={'small'}/>
          </CheckCard.Group>
        </div>
        <div style={{
          padding: '0 0 10px'
        }}>
          {'需要审批确认加入'}
          <Switch style={{marginLeft: '10px'}}
                  checkedChildren={<CheckOutlined/>}
                  unCheckedChildren={<CloseOutlined/>}
                  defaultChecked
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Input style={{flex: '80%'}} size={"middle"} placeholder={link} disabled={true}
                 autoComplete='off'/>
          <Button type={'primary'} style={{flex: '20%', marginLeft: '10px'}} onClick={() => openNotification(link)}>
            {'复制链接'}
          </Button>
        </div>
      </div>
    );
  };
  const listUserDataInfo = async () => {
    const res = await listUserDataInfoUsingGet()
    if (res.code === 0) {
      setOriginalData(res.data)
      console.log(res.data)
      const t = res.data?.map((item) => ({
        title: item.dataName,
        record: item,
        subTitle: <>
          {item.uploadType === 0 && <>
            <Tag color="#5BD8A6">Excel</Tag>
          </>}
          {item.uploadType === 1 && <>
            <Tag color="#5BD8A6">MySQL</Tag>
          </>}
          {item.userId !== currentUser?.id && item.uploadType === 0 && <>
            <Tag color="#5BD8A6">共享</Tag>
          </>}
        </>,
        actions: [
          <Popover key={"share"} placement="bottom" title={text} content={() => content(item)} trigger="click">
            {/*<Button>RB</Button>*/}
            {item.userId === currentUser?.id && item.uploadType === 0 && <>
              <a key="run" onClick={() => { // 请求链接
                // 获取链接
                // 设置默认读权限
                setShareDataId(item.id)
                getShareLink(item.id, 0)
              }}>共享</a>
            </>}
          </Popover>
          , <a key="delete" onClick={() => {
            warning(item)
          }}>删除</a>],
        avatar:
          item.uploadType === 0 ? '/assets/Excel.svg' : '/assets/Mysql.svg',
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
  }

  useEffect(() => {
    // 监听 loading 和 shareLink 变化
    console.log('loading 或 shareLink 发生变化');
  }, [loading, shareLink]);

  useEffect(() => {
    listUserDataInfo()
  }, [change]);


  const [cardActionProps, setCardActionProps] = useState<'actions' | 'extra'>(
    'extra',
  );
  const [ghost, setGhost] = useState<boolean>(false);
  const [fileVisible, setFileVisible] = useState(false);
  const [selectValue, setSelectValue] = useState('上传数据集');

  const { Dragger } = Upload;
  const [file, setFile] = useState<RcFile>()
  const [databaseVisible, setDatabaseVisible] = useState<boolean>(false);
  const [columns, setColumns] = useState<[]>()
  const [previewData, setPreviewData] = useState<API.ChartData[]>()


  // 定义字段类型与图标的映射关系
  const fieldTypeToIconMap = {
    'DATETIME':
      <Tooltip title="日期" key="date">
        <CalendarOutlined/>
      </Tooltip>
      , // 日期时间类型对应日历图标
    'LONG':
      <Tooltip title="整数" key="number">
        <NumberOutlined/>
      </Tooltip>
      ,       // 长整型对应数字图标
    'TEXT':
      <Tooltip title="文本" key="text">
        <FileTextOutlined/>
      </Tooltip>
      ,     // 文本类型对应文本文件图标
    'DOUBLE':
      <Tooltip title="浮点数" key="text">
        <DashboardOutlined/>
      </Tooltip>
      , // 双精度浮点型对应仪表盘图标
    // ... 其他类型与图标的映射
  };

  const generateColumns = (fields) => {
    const columns = fields.map(field => {
      const column = {
        title: (
          <Space>
            {fieldTypeToIconMap[field.fieldType] || <FileOutlined />}
            {field.originName}
          </Space>
        ), // 列标题
        dataIndex: field.name,   // 列数据索引，对应数据对象的键
        key: field.name,         // 列的唯一标识
        // 根据字段类型设置适当的编辑组件
        valueType: field.fieldType.toLowerCase() === 'datetime' ? 'date' : field.fieldType.toLowerCase(),
      };
      // 可以添加更多的配置选项，例如排序、过滤等
      return column;
    });
    console.log(columns)
    return columns;
  };


  const previewDataRequest = async (oriFile: RcFile) => {
    const res = await previewAndCheckExcelInfoUsingPost({}, oriFile)
    if (res.code === 0) {
      // 根据请求返回的数据动态生成列配置
      const newColumns = generateColumns(res.data?.tableFieldInfosList);
      // 更新列配置
      setColumns(newColumns);
      const a_data = res.data?.dataList?.map(item => ({
        ...item.data,
      }))
      setPreviewData(a_data)
    }
  }

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        console.log(info.file.originFileObj);
        // 发出预览请求
        message.success(`${info.file.name} file uploaded successfully.`);
        setFile(info.file.originFileObj)
        previewDataRequest(info.file.originFileObj)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };


  const handleChange = (values : any) => {
    console.log(values)
    if (values === 'file') { // 文件上传
      setFileVisible(true)
      setSelectValue('上传数据集')
    } else if (values === 'api'){ // API上传

    } else if (values === 'db'){
      setDatabaseVisible(true)
      setSelectValue('上传数据集')
    }
  }


  const formRef = useRef<FormInstance>(null);
  const [checkLoading, setCheckLoading] = useState<boolean>(false)
  const testConnect = async () => {
    try {
      const values = await formRef.current?.validateFields();
      // 通过校验
      console.log('Validated Values:', values);
      setCheckLoading(true)
      console.log(AES_Encrypt(values.password))
      const res = await checkConnectUsingPost({...values, password: AES_Encrypt(values.password)})
      if (res.code === 0) {
        message.success('校验成功')
      } else {
        message.error('校验失败')
      }
      // 这里可以添加进一步的校验逻辑
    } catch (error) {
      // 校验不通过
      // message.error('失败');
    } finally {
      setCheckLoading(false)
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#eee',
        margin: '-32px -40px'
      }}
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
        grid={{ gutter: 16, column: 3 }}
        onItem={(record: any) => {
          return {
            onClick: () => {
              // 跳转页面
              console.log(record)
              if (record.record.uploadType === 0) {
                history.push( '/add_chart_data/' + record.record.id);
              } else if (record.record.uploadType === 1) {
                history.push( '/mysql_detail/' + record.record.id);
              }
            },
          };
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
        headerTitle={
          <>
            <div>
              <div>我的数据集</div>
              <div style={{
                marginTop: '24px'
              }}><Select
                style={{ width: 120}}
                value={selectValue}
                onChange={handleChange}
                options={[
                  { value: 'file', label: '文件'},
                  { value: 'db', label: '数据库'},
                  { value: 'api', label: 'API上传', disabled: true }
                ]}
              />
              </div>
            </div>
          </>
        }
        dataSource={data}
      />
      <StepsForm
        onFinish={async (values) => {
          if (file === undefined) {
            message.error('文件未上传');
            return;
          }
          const uploadFileParams = {
            ...values,
          }
          const res = await uploadFileToMongoUsingPost(uploadFileParams, {}, file);
          if (res.code === 0) {
            setChange(!change)
            setFileVisible(false);
            setFile(undefined)
            message.success('提交成功');
          } else {
            setChange(!change)
            message.error(res.message);
            setChange(!change)
          }

        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="文件上传"
              width={800}
              onCancel={() => setFileVisible(false)}
              open={fileVisible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="first"
          title="填写数据集信息"
          onFinish={async () => {
            return true;
          }}
        >
          <ProFormText
            name="dataName"
            width="md"
            label="数据集名称"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            name="description"
            label="描述"
            width="lg"
            placeholder="描述数据集的来源、作用，可不填写~~"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="second" title="上传文件">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽上传文件</p>
            <p className="ant-upload-hint">
              仅仅支持单个文件上传，文件大小限制为10M
            </p>
          </Dragger>
          <div>
            {previewData && <>
              <p style={{paddingTop: '10px'}}>数据预览（前 5 条）</p>
              <ProTable<API.ChartData, API.PageParams>
                rowKey="id"
                search={false}
                ghost={true}
                dataSource={previewData}
                columns={columns}
                pagination={false}
              />
            </>}
          </div>
        </StepsForm.StepForm>
      </StepsForm>

      <StepsForm
        onFinish={async (values: API.DataSourceConfig) => {
          console.log({...values})
          const res = await saveDataSourceMetaInfoUsingPost({...values, password: AES_Encrypt(values.password)})
          if (res.code === 0) {
            setChange(!change)
            setDatabaseVisible(false);
            message.success('提交成功');
          } else {
            setChange(!change)
            message.error('提交失败');
            setChange(!change)
          }

        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="数据库上传"
              width={800}
              onCancel={() => setDatabaseVisible(false)}
              open={databaseVisible}
              footer={
                <Space>
                  <Button type={'default'} onClick={testConnect} loading={checkLoading}>
                    校验
                  </Button>
                  {
                    submitter
                  }
                </Space>
              }
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          formRef={formRef}
          name="first"
          title="数据库配置信息"
          onFinish={async () => {
            return true;
          }}
        >
          <ProFormText
            name="name"
            width="md"
            label="数据集名称"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            name="description"
            label="描述"
            width="lg"
            placeholder="描述数据集的来源、作用，可不填写~~"
          />
          <ProFormText
            name="host"
            width="md"
            label="主机名/IP地址"
            placeholder="请输入主机名/IP地址"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="port"
            width="md"
            label="端口"
            placeholder="请输入端口"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="dataBaseName"
            width="md"
            label="数据库名称"
            placeholder="请输入数据库名称"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="userName"
            width="md"
            label="用户名"
            placeholder="请输入用户名"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="password"
            width="md"
            label="密码"
            placeholder="请输入密码"
            rules={[{ required: true }]}
          />
        </StepsForm.StepForm>
      </StepsForm>


    </div>
  );
};
