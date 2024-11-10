import React, {useEffect, useRef, useState} from 'react';
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
  Card,
  Tag,
  Button,
  Drawer,
  Steps,
  Form,
  Select,
  InputNumber,
  Dropdown,
  DatePicker,
  Space,
  Table,
  TableColumnsType,
  Modal, Tooltip, MenuProps
} from 'antd';
import {
  CalendarOutlined, DashboardOutlined, DownOutlined,
  FileOutlined, FileTextOutlined,
  InboxOutlined,
  MinusCircleOutlined, NumberOutlined,
  PlusOutlined,
  SearchOutlined
} from "@ant-design/icons";
import {useParams} from "react-router";
import {checkConnect, getSchemas, previewData, saveDataSourceMetaInfo} from "@/services/DataLoom/dataSourceController";
import ProCard from "@ant-design/pro-card";
import {
  addDatasource,
  checkDatasource,
  getDataSource,
  handleApiResponse,
  listUserDataSource
} from "@/services/DataLoom/coreDataSourceController";
import {getByDatasource} from "@/services/DataLoom/coreDatasetTableController";
import {Radio} from 'antd/lib';
import Cron from 'antd-cron';
import moment from "moment";
import {FormInstance, ProFormText, ProFormTextArea, ProTable, StepsForm} from "@ant-design/pro-components";
import Dragger from 'antd/es/upload/Dragger';
import {file} from "@babel/types";
import {RcFile, UploadProps} from "antd/es/upload/interface";
import {previewAndCheckExcelInfo} from "@/services/DataLoom/dataController";
import {AES_Encrypt} from '../../utils/AES'

const {Content, Sider} = Layout;


const MyLayout = () => {

  const params = useParams();
  const [items, setItems] = useState<[]>()
  const [selectDatasource, setSelectDatasource] = useState<string>();
  const [datasource, setDatasource] = useState<API.DatasourceDTO>()
  const [configuration, setConfiguration] = useState<null>()
  const [dataList, setDataList] = useState<Record<string, any>[]>()
  const [datasources, setDatasources] = useState<[]>()
  const [ApiDefinitions, setApiDefinitions] = useState<Record<string, any>[]>()
  const [ApiDefinition, setApiDefinition] = useState<API.ApiDefinition>()
  const [DatasourceTask, setDatasourceTask] = useState<Record<string, any>>()
  const [bottomDrawerOpen, setbottomDrawerOpen] = useState(false);
  const [newBottomDrawerOpen, setnewBottomDrawerOpen] = useState(false);
  const [rightDrawerOpen, setrightDrawerOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [newCurrent, setnewCurrent] = useState(0);
  const [rightDrawerCurrent, setrightDrawerCurrent] = useState(0);
  const [updateFrequency, setUpdateFrequency] = useState('RIGHTNOW');
  const [updateType, setUpdateType] = useState('all_scope');
  const [headerItems, setHeaderItems] = useState<Record<string, any>[]>([]);
  const [argumentsItems, setArgumentsItems] = useState<Record<string, any>[]>([]);
  const [jsonFields, setjsonFields] = useState<Record<string, any>[]>([]);
  const [isNewApiDefinition, setIsNewApiDefinition] = useState(false);
  const [rightDrawerValue, setrightDrawerValue] = useState<Record<string, any>>({});
  const [formData, setFormData] = useState({});
  const [selectValue, setSelectValue] = useState('上传数据源');
  const [databaseVisible, setDatabaseVisible] = useState<boolean>(false);
  const [fileVisible, setFileVisible] = useState(false);
  const formRef = useRef<FormInstance>(null);
  const [checkLoading, setCheckLoading] = useState<boolean>(false)
  const [file, setFile] = useState<RcFile>()
  const [previewData, setPreviewData] = useState<API.ChartData[]>()
  const [columns, setColumns] = useState<[]>()
  const [change, setChange] = useState(false)
// 初始化选中的行，基于 checked 字段
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    jsonFields.flatMap(item =>
      item.checked ? [item.name] : item.children ? item.children.filter(child => child.checked).map(child => child.name) : []
    )
  );


  const [form] = Form.useForm()
  const [newform] = Form.useForm()
  const [rightDrawerForm] = Form.useForm()

  useEffect(() => {
    // 在数据获取后，设置表单的初始值
    if (datasource) {
      console.log(datasource)
      form.resetFields()
      form.setFieldsValue({
        ...datasource,
        syncSetting: {
          ...datasource.syncSetting,
          startTime: datasource?.syncSetting?.startTime
            ? moment(datasource?.syncSetting?.startTime, 'YYYY-MM-DD HH:mm:ss')
            : null,
          endTime: datasource?.syncSetting?.endTime
            ? moment(datasource?.syncSetting?.endTime, 'YYYY-MM-DD HH:mm:ss')
            : null,
        },
      })
      setUpdateFrequency(datasource?.syncSetting?.syncRate);
    }
  }, [datasource, form])

  useEffect(() => {
    form.setFieldsValue(datasource); // Populate the form with the current datasource values
  }, [current, datasource]);

  useEffect(() => {
    // 在数据获取后，设置表单的初始值
    console.log(ApiDefinition)
    rightDrawerForm.resetFields()
    rightDrawerForm.setFieldsValue(ApiDefinition)
    console.log(rightDrawerForm.getFieldValue("name"))
  }, [ApiDefinition, rightDrawerForm])

  const handleChange = (item: API.ApiDefinition) => {
    if (item.request) {
      // 将数据转换为表单需要的结构
      const headers = item?.request?.header?.map(header => ({
        key: Object.keys(header)[0],
        value: header[Object.keys(header)[0]]
      }));
      const Arguments = item?.request?.argument?.flatMap(argument =>
        Object.entries(argument).map(([key, value]) => ({
          key,
          value
        }))
      )
      setArgumentsItems(Arguments);
      setHeaderItems(headers);
    }
  }

  //
  const testConnect = async () => {
    try {
      const values = await formRef.current?.validateFields();
      // 通过校验
      console.log('Validated Values:', values);
      setCheckLoading(true)
      console.log(AES_Encrypt(values.password))
      const res = await checkConnect({...values, password: values.password})
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
            {fieldTypeToIconMap[field.fieldType] || <FileOutlined/>}
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
    const res = await previewAndCheckExcelInfo({}, oriFile)
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


  const handleApi = async (value: API.ApiDefinition) => {
    // 处理 headers，将数组转换为对象形式
    const headersArray = value.request?.headers || [];
    const headersObject = headersArray.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    // 处理 arguments，将数组转换为单个对象形式
    const argumentsArray = value.request?.arguments || [];
    const argumentsObject = argumentsArray.reduce((acc, curr) => {
      return {...acc, [curr.key]: curr.value};
    }, {});

    // 将处理后的对象重新赋值到 request 中
    value.request.headers = [headersObject];
    value.request.arguments = [argumentsObject]; // 转换为单个对象的数组
    console.log(value)
    const res = await handleApiResponse(value);
    if (res.code === 0) {
      message.success('接口校验成功')
      if (res?.data?.jsonFields) {
        setjsonFields(res.data.jsonFields)
      } else {
        setjsonFields([])
      }
      value.status = "success"
      setrightDrawerValue(value)
      return true
    } else {
      message.error(res.message)
      return false
    }
  }

  const next = () => {
    form.validateFields()
      .then(values => {
        setDatasource(prev => ({...prev, ...values})); // Merge the current form values into the datasource object
        setCurrent(current + 1); // Move to the next step
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const newNext = () => {
    console.log("333333333333")
    console.log(datasource)
    form.validateFields()
      .then(values => {
        setDatasource(prev => ({...prev, ...values})); // Merge the current form values into the datasource object
        setnewCurrent(newCurrent + 1); // Move to the next step
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const rightDrawerNext = async (value) => {
    const flag = await handleApi(value)
    if (flag)
      setrightDrawerCurrent(rightDrawerCurrent + 1);
  };

  const prev = () => {
    form.validateFields()
      .then(values => {
        setDatasource(prev => ({...prev, ...values})); // Merge the current form values into the datasource object
        setCurrent(current - 1); // Move to the previous step
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const newPrev = () => {
    form.validateFields()
      .then(values => {
        setDatasource(prev => ({...prev, ...values})); // Merge the current form values into the datasource object
        setnewCurrent(newCurrent - 1); // Move to the previous step
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const rightDrawerPrev = () => {
    setrightDrawerCurrent(rightDrawerCurrent - 1);
  };

// 递归更新 checked 状态，确保父子节点一起更新
  const updateCheckedState = (fields, selectedKeys) => {
    return fields.map(item => {
      const isSelected = selectedKeys.includes(item.name);
      return {
        ...item,
        checked: isSelected,
        // 如果有子元素，递归更新子元素的 checked 状态
        children: item.children ? updateCheckedState(item.children, selectedKeys) : undefined
      };
    });
  };

// 递归获取所有子元素的 name
  const getAllChildKeys = (item) => {
    let childKeys = [];
    if (item.children) {
      childKeys = item.children.map(child => child.name);
      item.children.forEach(child => {
        childKeys = [...childKeys, ...getAllChildKeys(child)];
      });
    }
    return childKeys;
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      let updatedSelectedKeys = [...selectedKeys]; // 工作在一个可修改的副本上

      jsonFields.forEach(item => {
        if (selectedKeys.includes(item.name)) {
          // 如果选中父节点，选中所有子节点
          const childKeys = getAllChildKeys(item);
          updatedSelectedKeys = [...new Set([...updatedSelectedKeys, ...childKeys])];
        } else {
          // 如果取消父节点，取消所有子节点
          const childKeys = getAllChildKeys(item);
          updatedSelectedKeys = updatedSelectedKeys.filter(key => !childKeys.includes(key));
        }
      });

      setSelectedRowKeys(updatedSelectedKeys);

      // 更新 jsonFields 中的 checked 状态
      const updatedFields = updateCheckedState(jsonFields, updatedSelectedKeys);
      setjsonFields(updatedFields);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  const addApiDefinition = (values) => {
    if (isNewApiDefinition) {
      console.log("-------------------")
      console.log(values)
      setApiDefinitions(prevDefinitions => [...prevDefinitions, values]);
    } else {
      setApiDefinitions(ApiDefinitions?.map((item) => (item.name === values.name ? values : item)));
    }
  }

  const submitDatasource = async (values: API.DatasourceDTO) => {
    const formData = new FormData();
    console.log(values)
    values.type = "api"
    values.configuration = JSON.stringify(ApiDefinitions)
    formData.append("file", new Blob([], {type: 'text/plain'}));
    formData.append('datasourceDTO', new Blob([JSON.stringify(values)], {type: "application/json"}));
    const res = await addDatasource(formData)
    if (res.code === 200) {
      console.log(1)
    } else {
      message.error(res.message);
    }
  }

  const apiColumns = [
    {
      title: '字段名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '字段类型',
      dataIndex: 'type',
      width: "40%",
      key: 'type',
    },
  ];

  const excelDatasourceConfItems: DescriptionsProps['items'] = [
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
      label: '文件名',
      children: configuration?.filename,
    },
    {
      key: '4',
      label: '文件大小',
      children: configuration?.size,
    },
  ];

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
    },
    {
      title: '数据更新设置',
    },
  ];

  const RightDrawerSteps = [
    {
      title: '连接API',
    },
    {
      title: '提取数据',
    },
  ];

  const queryItems: TabsProps['items'] = [
    {
      key: '1',
      label: '请求头',
      children: <>
        <Form.List name={['request', 'headers']} initialValue={headerItems}>
          {(fields, {add: addHeader, remove: removeHeader}) => (
            <>
              {headerItems ? (
                fields.map(({key, name, fieldKey, ...restField}) => (
                  <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'key']}
                      fieldKey={[fieldKey, 'key']}
                      rules={[{required: true, message: '请输入键'}]}
                    >
                      <Input placeholder="键"/>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      fieldKey={[fieldKey, 'value']}
                      rules={[{required: true, message: '请输入值'}]}
                    >
                      <Input placeholder="值"/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => removeHeader(name)}/>
                  </Space>
                ))
              ) : null}
              <Form.Item>
                <Button type="dashed" onClick={() => addHeader()} block icon={<PlusOutlined/>}>
                  添加参数
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </>,
    },
    {
      key: '2',
      label: 'QUERY参数',
      children: <>
        <Form.List name={['request', 'arguments']} initialValue={argumentsItems}>
          {(fields, {add: addHeader, remove: removeHeader}) => (
            <>
              {fields.map(({key, name, fieldKey, ...restField}) => {
                // 根据数据生成字段名
                const argumentsItem = argumentsItems[name];
                console.log(argumentsItem)
                return (
                  <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'key']}
                      fieldKey={[fieldKey, 'key']}
                      // initialValue={headerItem ? headerItem.key : ''}
                      rules={[{required: true, message: '请输入键'}]}
                    >
                      <Input placeholder="键"/>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      fieldKey={[fieldKey, 'value']}
                      // initialValue={headerItem ? headerItem.value : ''}
                      rules={[{required: true, message: '请输入值'}]}
                    >
                      <Input placeholder="值"/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => removeHeader(name)}/>
                  </Space>
                );
              })}
              <Form.Item>
                <Button type="dashed" onClick={() => addHeader()} block icon={<PlusOutlined/>}>
                  添加参数
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </>,
    },
    {
      key: '3',
      label: '请求体',
      children: (
        <>
          <Form.Item
            name={['request', 'bodyType']}
            label="请求体类型"
          >
            <Radio.Group>
              <Radio value="formData">Form Data</Radio>
              <Radio value="urlEncoded">x-www-form-urlencoded</Radio>
              <Radio value="raw">Raw</Radio>
              <Radio value="xml">XML</Radio>
              <Radio value="json">JSON</Radio>
            </Radio.Group>
          </Form.Item>

          {/* 动态渲染表单 */}
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.request?.bodyType !== currentValues.request?.bodyType}
          >
            {({getFieldValue}) => {
              const bodyType = getFieldValue(['request', 'bodyType']);

              if (bodyType === 'formData') {
                return (
                  <Form.List name={['request', 'body', 'formData']}>
                    {(fields, {add, remove}) => (
                      <>
                        {fields.map(({key, name, fieldKey, ...restField}) => (
                          <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name, 'formKey']}
                              fieldKey={[fieldKey, 'formKey']}
                              rules={[{required: true, message: '请输入键'}]}
                            >
                              <Input placeholder="键"/>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'formValue']}
                              fieldKey={[fieldKey, 'formValue']}
                              rules={[{required: true, message: '请输入值'}]}
                            >
                              <Input placeholder="值"/>
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)}/>
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                            添加参数
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                );
              }

              if (bodyType === 'urlEncoded') {
                return (
                  <Form.List name={['request', 'body', 'urlEncoded']}>
                    {(fields, {add, remove}) => (
                      <>
                        {fields.map(({key, name, fieldKey, ...restField}) => (
                          <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name, 'urlEncodedKey']}
                              fieldKey={[fieldKey, 'urlEncodedKey']}
                              rules={[{required: true, message: '请输入键'}]}
                            >
                              <Input placeholder="键"/>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'urlEncodedValue']}
                              fieldKey={[fieldKey, 'urlEncodedValue']}
                              rules={[{required: true, message: '请输入值'}]}
                            >
                              <Input placeholder="值"/>
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)}/>
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                            添加参数
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                );
              }

              if (['raw', 'xml', 'json'].includes(bodyType)) {
                return (
                  <Form.Item
                    name={['request', 'body', `${bodyType}Body`]}
                    label={`${bodyType.toUpperCase()} 请求体`}
                  >
                    <Input.TextArea rows={4} placeholder={`请输入 ${bodyType.toUpperCase()} 格式的请求体`}/>
                  </Form.Item>
                );
              }

              return null;
            }}
          </Form.Item>


        </>
      )
    }
    ,
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
      if (res.data.syncSetting) {
        if (res.data.syncSetting.startTime) {
          res.data.syncSetting.startTime = moment(res.data.syncSetting.startTime);
        }
        if (res.data.syncSetting.endTime) {
          res.data.syncSetting.endTime = moment(res.data.syncSetting.endTime);
        }
      }
      setDatasource(res.data)
      // @ts-ignore
      if (res.data.type === 'mysql') {
        setConfiguration(JSON.parse(res.data.configuration))
      } else if (res.data.type === 'api') {
        setApiDefinitions(JSON.parse(res.data.configuration))
        await getTaskByDatasource(selectDatasource)
      } else {
        setConfiguration(JSON.parse(res.data.configuration))
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
    setbottomDrawerOpen(true)
  }

  const rightOpenEdit = () => {
    setrightDrawerOpen(true)
  }

  const onRightClose = () => {
    setrightDrawerOpen(false)
  }

  const onClose = () => {
    setCurrent(0)
    setbottomDrawerOpen(false);
  };

  const onNewClose = () => {
    setnewCurrent(0)
    getDatasourceById(datasource?.id)
    setnewBottomDrawerOpen(false);
  };

  useEffect(() => {
    fetchUserDatasource()
  }, []);

  useEffect(() => {
    fetchUserDatasource()
  }, [change]);

  useEffect(() => {
    getDatasourceById(selectDatasource)
  }, [selectDatasource]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const {status} = info.file;
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
            {
              datasource?.type === 'excel' &&
              <Descriptions title="Excel数据源配置" layout="vertical" items={excelDatasourceConfItems}/>
            }
          </div>
        </ProCard>
        {
          datasource?.type === 'api' &&
          <ProCard title="数据表" headerBordered headStyle={{background: '#F5F6F7'}}>
            <Row gutter={[16, 8]}>
              {ApiDefinitions?.map((item, index) => (
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
          scroll={{x: 1000, y: 600}} pagination={false} search={false}/>
      </>
    }
  ];


  const typeItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a onClick={() => {
          setFileVisible(true)
          setSelectValue('上传数据集')
        }}>
          文件
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={() => {
          setApiDefinitions([])
          form.resetFields()
          rightDrawerForm.resetFields()
          setnewBottomDrawerOpen(true)
        }}>
          API
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a onClick={() => {
          setDatabaseVisible(true)
          setSelectValue('上传数据集')
        }}>
          数据库
        </a>
      ),
    }
  ];

  return (
    <Layout style={{minHeight: '100vh', margin: '-32px -40px'}}>
      <Sider width={250} style={{background: '#fff'}}>
        <div style={{padding: '16px'}}>
          <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            <h4>
              数据源
            </h4>
            <div>
              <Dropdown menu={{ items: typeItems }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <PlusOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
          <h4>
            <StepsForm
              onFinish={async (values) => {
                if (file === undefined) {
                  message.error('文件未上传');
                  return;
                }
                const formData = new FormData();
                formData.append("file", file);
                const param = {
                  pid: 0,
                  name: values.name,
                  type: 'excel',
                  configuration: '',
                  file: file
                }
                //json部分
                const datasourceDTO = JSON.stringify(param);
                formData.append('datasourceDTO', new Blob([datasourceDTO], {type: "application/json"}));
                // file
                console.log(formData)
                const res = await addDatasource(formData);
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
                  name="name"
                  width="md"
                  label="数据源名称"
                  placeholder="请输入名称"
                  rules={[{required: true}]}
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
                    <InboxOutlined/>
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
                      columns={apiColumns}
                      pagination={false}
                    />
                  </>}
                </div>
              </StepsForm.StepForm>
            </StepsForm>

            <StepsForm
              onFinish={async (values: API.DatasourceDTO) => {
                console.log({...values})
                const formData = new FormData();
                const param = {
                  pid: 0,
                  name: values.name,
                  type: 'mysql',
                  configuration: '',
                  file: file
                }
                param.configuration = JSON.stringify(values)
                //json部分
                const datasourceDTO = JSON.stringify(param);
                formData.append("file", new Blob([], {type: 'text/plain'}));
                formData.append('datasourceDTO', new Blob([datasourceDTO], {type: "application/json"}));
                // file
                console.log(formData)
                const res = await addDatasource(formData)
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
                  label="数据源名称"
                  placeholder="请输入名称"
                  rules={[{required: true}]}
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
                  rules={[{required: true}]}
                />
                <ProFormText
                  name="port"
                  width="md"
                  label="端口"
                  placeholder="请输入端口"
                  rules={[{required: true}]}
                />
                <ProFormText
                  name="dataBaseName"
                  width="md"
                  label="数据库名称"
                  placeholder="请输入数据库名称"
                  rules={[{required: true}]}
                />
                <ProFormText
                  name="userName"
                  width="md"
                  label="用户名"
                  placeholder="请输入用户名"
                  rules={[{required: true}]}
                />
                <ProFormText
                  name="password"
                  width="md"
                  label="密码"
                  placeholder="请输入密码"
                  rules={[{required: true}]}
                />
              </StepsForm.StepForm>
            </StepsForm>
          </h4>

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
            {
              datasource?.type === 'api' && (<div>
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
                </div>
              )
            }
            <Tabs defaultActiveKey="1" items={tableItems} onChange={onChange}/>
          </div>
        </Content>
      </Layout>
      <Drawer
        title="编辑数据源"
        placement="bottom"
        // closable={false}
        onClose={onClose}
        open={bottomDrawerOpen}
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
                    <Form layout="vertical" form={form} initialValues={datasource}>
                      <Form.Item
                        label="数据源名称"
                        name="name"
                        rules={[{required: true}]}
                      >
                        <Input style={{width: "40em"}}></Input>
                      </Form.Item>

                      <Form.Item
                        label="描述"
                        name="description"
                        rules={[{message: '请输入描述信息'}]}
                      >
                        <Input.TextArea style={{height: "4em"}} showCount
                                        maxLength={100}></Input.TextArea>
                      </Form.Item>
                    </Form>
                  </div>
                </ProCard>
                <div>
                  <Button type="primary"
                          style={{position: 'absolute', right: '250px', width: "80px", height: "35px", zIndex: 2}}
                          onClick={() => {
                            setrightDrawerCurrent(0)
                            setApiDefinition(undefined)
                            setHeaderItems([])
                            setArgumentsItems([])
                            rightOpenEdit()
                            setIsNewApiDefinition(true)
                          }}>
                    添加+
                  </Button>
                </div>
                <ProCard
                  title="数据表"
                  headerBordered
                  style={{
                    width: "80%",  // 缩小宽度
                  }}
                >
                  <Row gutter={[8, 8]}>  {/* 减少列间距 */}
                    {ApiDefinitions?.map((item, index) => (
                      <Col span={12} key={index}>
                        <Card title={
                          <div>
                            {item.name} {item.status === 'success' ? <Tag color="success">有效</Tag> :
                            <Tag color="error">失效</Tag>}
                          </div>
                        }
                              onClick={() => {
                                setrightDrawerCurrent(0)
                                setApiDefinition(item)
                                handleChange(item)
                                rightOpenEdit()
                                setIsNewApiDefinition(false)
                              }}
                        >
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
                      <Form layout="vertical" form={form} initialValues={datasource.syncSetting}>
                        <Form.Item label="更新方式" name="updateType" required={true}>
                          <Radio.Group onChange={e => setUpdateType(e.target.value)} value={updateType}>
                            <Radio value="all_scope">全量更新</Radio>
                            <Radio value="add_scope">增量更新</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item label="更新频率" name="syncRate" required={true}>
                          <Radio.Group onChange={handleUpdateFrequencyChange} value={updateFrequency}>
                            <Radio value="RIGHTNOW">立即更新</Radio>
                            <Radio value="CRON">表达式设定</Radio>
                            <Radio value="SIMPLE_CRON">简单重复</Radio>
                          </Radio.Group>
                        </Form.Item>

                        {/* 当选择 "CRON" 时显示表达式输入框 */}
                        {updateFrequency === 'CRON' && (
                          <div>
                            <Form.Item name="cron" label="CRON 表达式">
                              {/*TODO 修改为CRON组件*/}
                              <Input></Input>
                            </Form.Item>
                            <Form.Item name="startTime" label="开始时间" required={true}>
                              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>
                            <Form.Item name="endTime" label="结束时间">
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
                                <Form.Item
                                  name="simpleCronValue"
                                  noStyle
                                  rules={[{required: true, message: '请输入更新频率'}]}
                                >
                                  <InputNumber
                                    style={{
                                      width: '10%',
                                      marginLeft: '8px',  // 增加左边距
                                      marginRight: '8px'  // 增加右边距
                                    }}
                                    placeholder="每多少"
                                  />
                                </Form.Item>
                                <Form.Item
                                  name="simpleCronType"
                                  noStyle
                                  rules={[{required: true, message: '请输入更新频率'}]}
                                >
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
                                </Form.Item>
                                更新一次
                              </Input.Group>
                            </Form.Item>
                            <Form.Item name="startTime" label="开始时间" required={true}>
                              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>
                            <Form.Item name="endTime" label="结束时间">
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
                <Button type="primary" onClick={() => {
                  form.validateFields()
                    .then(values => {
                      // Update the datasource with the final step values
                      const updatedDatasource = {...datasource, ...values};
                      setDatasource(updatedDatasource); // Optionally update the datasource state
                      submitDatasource(updatedDatasource);  // Submit the entire datasource object
                    })
                    .catch(errorInfo => {
                      console.log('保存失败:', errorInfo); // Handle validation errors
                    });
                  message.success('处理完成！');
                }}>
                  保存
                </Button>
              )}
            </div>
          </div>
        )}

      </Drawer>
      <Drawer
        title="编辑数据表"
        placement="right"
        // closable={false}
        onClose={onRightClose}
        open={rightDrawerOpen}
        height="100%"
        width="50%"
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",  // 确保内容从顶部开始显示
          height: "100%",
          overflowY: "auto"
        }}>
          <Steps current={rightDrawerCurrent} items={RightDrawerSteps} size="small" style={{width: "40%"}}/>
          {rightDrawerCurrent === 0 && (
            <>
              <ProCard
                title="基础信息"
                headerBordered
                style={{
                  width: "80%",  // 缩小宽度
                }}
              >
                <Form layout="vertical" form={rightDrawerForm} initialValues={ApiDefinition}>
                  <Form.Item
                    label="数据表名称"
                    name="name"
                    rules={[{required: true, message: '请输入数据表名称'}]}
                  >
                    <Input style={{width: "100%"}}></Input>
                  </Form.Item>
                  <Form.Item
                    label="请求"
                    required={true}
                  >
                    <Input.Group compact>
                      <Form.Item noStyle name="method">
                        <Select style={{width: "20%"}} defaultValue="GET">
                          <Option value="GET">GET</Option>
                          <Option value="POST">POST</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item noStyle rules={[{required: true, message: '请输入请求'}]} name="url">
                        <Input style={{width: "80%"}}></Input>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                  <Tabs defaultActiveKey="1" items={queryItems} onChange={onChange}/>
                  <Form.Item
                    label="请求超时"
                    required={true}
                  >
                    <Input.Group compact>
                      <div style={{display: 'inline-block', width: '80%'}}>
                        <Form.Item noStyle rules={[{required: true, message: '请输入请求超时时间'}]}
                                   name="apiQueryTimeout">
                          <InputNumber style={{width: '100%'}}/>
                        </Form.Item>
                      </div>
                      <div style={{display: 'inline-block', width: '20%'}}>
                        <Form.Item noStyle>
                          <Input defaultValue="秒" disabled/>
                        </Form.Item>
                      </div>
                    </Input.Group>
                  </Form.Item>
                </Form>
              </ProCard>
            </>
          )}
          {rightDrawerCurrent === 1 && (
            <>
              <ProCard
                title="数据结构"
                headerBordered
                style={{
                  width: "80%",  // 缩小宽度
                }}
              >
                <Table
                  columns={apiColumns}
                  rowSelection={rowSelection}
                  dataSource={jsonFields}
                  rowKey="name"
                />
              </ProCard>
            </>
          )}
          <div style={{marginTop: 24}}>
            {rightDrawerCurrent < RightDrawerSteps.length - 1 && (
              <Button type="primary" onClick={() => {
                rightDrawerForm.validateFields().then((values) => {
                  rightDrawerNext(values); // 将验证后的表单数据传递给 rightDrawerNext 函数
                }).catch((errorInfo) => {
                  console.log('验证失败:', errorInfo); // 处理验证失败的情况
                });
              }}>
                下一步
              </Button>
            )}
            {rightDrawerCurrent > 0 && (
              <Button style={{margin: '0 8px'}} onClick={rightDrawerPrev}>
                上一步
              </Button>
            )}
            {rightDrawerCurrent === RightDrawerSteps.length - 1 && (
              <Button type="primary" onClick={() => {
                addApiDefinition(rightDrawerValue);
                message.success('保存完成！')
                console.log(selectedRowKeys)
                console.log(jsonFields)
                setrightDrawerOpen(false);
              }}>
                保存
              </Button>
            )}
          </div>
        </div>
      </Drawer>



      <Drawer
        title="新增数据源"
        placement="bottom"
        // closable={false}
        onClose={onNewClose}
        open={newBottomDrawerOpen}
        height="90%"
      >
        {(
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",  // 确保内容从顶部开始显示
            height: "100%",
            overflowY: "auto"
          }}>
            <Steps current={newCurrent} items={steps} size="small" style={{width: "40%"}}/>
            {/* 当current为0时，同时显示基础信息和数据表 */}
            {newCurrent === 0 && (
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
                    <Form layout="vertical" form={newform}>
                      <Form.Item
                        label="数据源名称"
                        name="name"
                        rules={[{required: true}]}
                      >
                        <Input style={{width: "40em"}}></Input>
                      </Form.Item>

                      <Form.Item
                        label="描述"
                        name="description"
                        rules={[{message: '请输入描述信息'}]}
                      >
                        <Input.TextArea style={{height: "4em"}} showCount
                                        maxLength={100}></Input.TextArea>
                      </Form.Item>
                    </Form>
                  </div>
                </ProCard>
                <div>
                  <Button type="primary"
                          style={{position: 'absolute', right: '250px', width: "80px", height: "35px", zIndex: 2}}
                          onClick={() => {
                            setrightDrawerCurrent(0)
                            setApiDefinition(undefined)
                            setHeaderItems([])
                            setArgumentsItems([])
                            rightOpenEdit()
                            setIsNewApiDefinition(true)
                          }}>
                    添加+
                  </Button>
                </div>
                <ProCard
                  title="数据表"
                  headerBordered
                  style={{
                    width: "80%",  // 缩小宽度
                  }}
                >
                  <Row gutter={[8, 8]}>  {/* 减少列间距 */}
                    {ApiDefinitions?.map((item, index) => (
                      <Col span={12} key={index}>
                        <Card title={
                          <div>
                            {item.name} {item.status === 'success' ? <Tag color="success">有效</Tag> :
                            <Tag color="error">失效</Tag>}
                          </div>
                        }
                              onClick={() => {
                                setrightDrawerCurrent(0)
                                setApiDefinition(item)
                                handleChange(item)
                                rightOpenEdit()
                                setIsNewApiDefinition(false)
                              }}
                        >
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
            {newCurrent === 1 && (
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
                      <Form layout="vertical" form={newform}>
                        <Form.Item label="更新方式" name="updateType" required={true}>
                          <Radio.Group onChange={e => setUpdateType(e.target.value)} value={updateType}>
                            <Radio value="all_scope">全量更新</Radio>
                            <Radio value="add_scope">增量更新</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item label="更新频率" name="syncRate" required={true}>
                          <Radio.Group onChange={handleUpdateFrequencyChange} value={updateFrequency}>
                            <Radio value="RIGHTNOW">立即更新</Radio>
                            <Radio value="CRON">表达式设定</Radio>
                            <Radio value="SIMPLE_CRON">简单重复</Radio>
                          </Radio.Group>
                        </Form.Item>

                        {/* 当选择 "CRON" 时显示表达式输入框 */}
                        {updateFrequency === 'CRON' && (
                          <div>
                            <Form.Item name="cron" label="CRON 表达式">
                              {/*TODO 修改为CRON组件*/}
                              <Input></Input>
                            </Form.Item>
                            <Form.Item name="startTime" label="开始时间" required={true}>
                              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>
                            <Form.Item name="endTime" label="结束时间">
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
                                <Form.Item
                                  name="simpleCronValue"
                                  noStyle
                                  rules={[{required: true, message: '请输入更新频率'}]}
                                >
                                  <InputNumber
                                    style={{
                                      width: '10%',
                                      marginLeft: '8px',  // 增加左边距
                                      marginRight: '8px'  // 增加右边距
                                    }}
                                    placeholder="每多少"
                                  />
                                </Form.Item>
                                <Form.Item
                                  name="simpleCronType"
                                  noStyle
                                  rules={[{required: true, message: '请输入更新频率'}]}
                                >
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
                                </Form.Item>
                                更新一次
                              </Input.Group>
                            </Form.Item>
                            <Form.Item name="startTime" label="开始时间" required={true}>
                              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>
                            <Form.Item name="endTime" label="结束时间">
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
              {newCurrent < steps.length - 1 && (
                <Button type="primary" onClick={newNext}>
                  下一步
                </Button>
              )}
              {newCurrent > 0 && (
                <Button style={{margin: '0 8px'}} onClick={newPrev}>
                  上一步
                </Button>
              )}
              {newCurrent === steps.length - 1 && (
                <Button type="primary" onClick={() => {
                  form.validateFields()
                    .then(values => {
                      // Update the datasource with the final step values
                      const updatedDatasource = {...datasource, ...values};
                      setDatasource(updatedDatasource); // Optionally update the datasource state
                      submitDatasource(updatedDatasource);  // Submit the entire datasource object
                    })
                    .catch(errorInfo => {
                      console.log('保存失败:', errorInfo); // Handle validation errors
                    });
                  message.success('处理完成！');
                }}>
                  保存
                </Button>
              )}
            </div>
          </div>
        )}

      </Drawer>
      <Drawer
        title="编辑数据表"
        placement="right"
        // closable={false}
        onClose={onRightClose}
        open={rightDrawerOpen}
        height="100%"
        width="50%"
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",  // 确保内容从顶部开始显示
          height: "100%",
          overflowY: "auto"
        }}>
          <Steps current={rightDrawerCurrent} items={RightDrawerSteps} size="small" style={{width: "40%"}}/>
          {rightDrawerCurrent === 0 && (
            <>
              <ProCard
                title="基础信息"
                headerBordered
                style={{
                  width: "80%",  // 缩小宽度
                }}
              >
                <Form layout="vertical" form={rightDrawerForm}>
                  <Form.Item
                    label="数据表名称"
                    name="name"
                    rules={[{required: true, message: '请输入数据表名称'}]}
                  >
                    <Input style={{width: "100%"}}></Input>
                  </Form.Item>
                  <Form.Item
                    label="请求"
                    required={true}
                  >
                    <Input.Group compact>
                      <Form.Item noStyle name="method">
                        <Select style={{width: "20%"}} defaultValue="GET">
                          <Option value="GET">GET</Option>
                          <Option value="POST">POST</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item noStyle rules={[{required: true, message: '请输入请求'}]} name="url">
                        <Input style={{width: "80%"}}></Input>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                  <Tabs defaultActiveKey="1" items={queryItems} onChange={onChange}/>
                  <Form.Item
                    label="请求超时"
                    required={true}
                  >
                    <Input.Group compact>
                      <div style={{display: 'inline-block', width: '80%'}}>
                        <Form.Item noStyle rules={[{required: true, message: '请输入请求超时时间'}]}
                                   name="apiQueryTimeout">
                          <InputNumber style={{width: '100%'}}/>
                        </Form.Item>
                      </div>
                      <div style={{display: 'inline-block', width: '20%'}}>
                        <Form.Item noStyle>
                          <Input defaultValue="秒" disabled/>
                        </Form.Item>
                      </div>
                    </Input.Group>
                  </Form.Item>
                </Form>
              </ProCard>
            </>
          )}
          {rightDrawerCurrent === 1 && (
            <>
              <ProCard
                title="数据结构"
                headerBordered
                style={{
                  width: "80%",  // 缩小宽度
                }}
              >
                <Table
                  columns={apiColumns}
                  rowSelection={rowSelection}
                  dataSource={jsonFields}
                  rowKey="name"
                />
              </ProCard>
            </>
          )}
          <div style={{marginTop: 24}}>
            {rightDrawerCurrent < RightDrawerSteps.length - 1 && (
              <Button type="primary" onClick={() => {
                rightDrawerForm.validateFields().then((values) => {
                  rightDrawerNext(values); // 将验证后的表单数据传递给 rightDrawerNext 函数
                }).catch((errorInfo) => {
                  console.log('验证失败:', errorInfo); // 处理验证失败的情况
                });
              }}>
                下一步
              </Button>
            )}
            {rightDrawerCurrent > 0 && (
              <Button style={{margin: '0 8px'}} onClick={rightDrawerPrev}>
                上一步
              </Button>
            )}
            {rightDrawerCurrent === RightDrawerSteps.length - 1 && (
              <Button type="primary" onClick={() => {
                addApiDefinition(rightDrawerValue);
                message.success('保存完成！')
                console.log(selectedRowKeys)
                console.log(jsonFields)
                setrightDrawerOpen(false);
              }}>
                保存
              </Button>
            )}
          </div>
        </div>
      </Drawer>
    </Layout>
  )
    ;
};

export default MyLayout;
