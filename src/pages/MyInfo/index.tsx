import { genChartByAiUsingPOST } from '@/services/hwqbi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin, Tooltip
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {useModel} from "@@/exports";

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import {getLoginUserUsingGET, updateMyUserUsingPOST, updateUserUsingPOST} from "@/services/hwqbi/userController";
import {addRewardUsingGET} from "@/services/hwqbi/rewardRecordController";
import {flushSync} from "react-dom";
import WebSocketComponent from "@/components/WebSocket";
import defaultSettings from "../../../config/defaultSettings";
import {
  getUserCurMonthAiRecordUsingGET,
  getUserCurMonthBiRecordUsingGET
} from "@/services/hwqbi/serviceRecordController";
import {cloneDeep} from "lodash";

/**
 * 添加图表页面
 * @constructor
 */


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  console.log('fileInfo')
  console.log(file)
  return isJpgOrPng && isLt2M;
};

const MyInfo: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};

  const [BiOption, setBiOption] = useState({
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true
      }
  ]
  })

  const [AiOption, setAiOption] = useState({
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true
      }
    ]
  })

  const [loading, setLoading] = useState(false);
  const [optionLoading, setOptionLoading] = useState(false);
  // @ts-ignore
  const [imageUrl, setImageUrl] = useState<string>(currentUser?.userAvatar);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  // 重新获取用户信息
  const getCurrentUser = async () => {
    const res = await getLoginUserUsingGET()
    if(res.data) {
      setInitialState({
        currentUser: res.data,
        settings: defaultSettings
      })
    } else {
      message.error('获取用户失败')
    }
    return;
  }

  //获取接口信息
  const userInvokeBiInfo = async () => {
    setOptionLoading(true)
    const res = await getUserCurMonthBiRecordUsingGET();
    if (res.data) {
      console.log(res.data)
      const newOption = cloneDeep(BiOption)
      // @ts-ignore
      newOption.xAxis.data = res.data.serviceDate
      // @ts-ignore
      newOption.series[0].data = res.data.serviceData
      newOption.title = {
        text: res.data.serviceType + '调用情况'
      }
      setBiOption(newOption)
      setOptionLoading(false)
    }
  }

  const userInvokeAiInfo = async () => {
    setOptionLoading(true)
    const res = await getUserCurMonthAiRecordUsingGET();
    if (res.data) {
      console.log(res.data)
      const newOption = cloneDeep(AiOption)
      // @ts-ignore
      newOption.xAxis.data = res.data.serviceDate
      // @ts-ignore
      newOption.series[0].data = res.data.serviceData
      newOption.title = {
        text: res.data.serviceType + '调用情况'
      }
      setAiOption(newOption)
      setOptionLoading(false)
    }
  }
  // 钩子，页面加载触发
  useEffect(() => {
    getCurrentUser();
    userInvokeBiInfo()
    userInvokeAiInfo()
  },[])




  const getFreeAnalysis = async () => {
    const res = await addRewardUsingGET();
    if (res.code === 0) {
      message.success('获取成功')
      // 更新用户信息
      const userInfo = await getLoginUserUsingGET();
      if (userInfo) {
        flushSync(() => {
          // @ts-ignore
          setInitialState({
            currentUser: userInfo.data,
            settings: defaultSettings
          });
        });
      }
    } else {
      message.error(res.message)
    }
  }

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
    // 对接后端，上传数据
    const params = {
      ...values
    };
    console.log(params)
    setSubmitting(false);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="add-chart">
      <WebSocketComponent userId={currentUser?.id}></WebSocketComponent>
      <Row gutter={24}>
        <Col span={24}>
          <Card title="个人信息">
            <Form name="addChart" labelAlign="left" labelCol={{ span: 4 }}
                  wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{}}>
              <Form.Item
                name="userName"
                label="昵称"
                initialValue={currentUser?.userName}
              >
                <Input placeholder="用户昵称" />
              </Form.Item>

              <Form.Item name="userAvatar" label="头像">
                <Upload
                  name="userAvatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  maxCount={1}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', maxHeight: '100px'}} /> : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                <Space>
                  <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                    修改信息
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row gutter={24}>
        <Col span={24}>
          <Card title="我的使用">
            <div style={{display: "flex"}}>
              <div style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="1积分可以分析一次图表">
                  <span>积分: {currentUser?.totalRewardPoints}</span>
                </Tooltip>
              </div>
              <div>
                <Button type={"primary"} size={'small'} style={{marginLeft: '20px'}} onClick={getFreeAnalysis}>每日领取</Button>
                <Button type={"primary"}  size={'small'} style={{marginLeft: '20px'}}>获取更多</Button>
              </div>
            </div>
            <div style={{display: "flex", marginTop: "30px"}}>
              <div style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="会员每日可免费分析10次">
                  <span>身份: 普通用户</span>
                </Tooltip>
              </div>
              <div>
                <Button type={"primary"} style={{marginLeft: '20px'}}>获取会员</Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Divider />
      <Card title={'服务调用情况'} loading={optionLoading}>
        <Row gutter={24}>
          <Col span={12}>
            {
              BiOption.title && <>
                <div style={{width: '100%', height: '400px', padding: '20px'}}>
                  <ReactECharts option={BiOption} />
                </div>
              </>
            }
          </Col>
          <Col span={12}>
            {
              AiOption.title && <>
                <div style={{width: '100%', height: '400px', padding: '20px'}}>
                  <ReactECharts option={AiOption} />
                </div>
              </>
            }
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default MyInfo;
