import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input, Modal,
  Row,
  Space,
  Tooltip
} from 'antd';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {useModel} from "@@/exports";

import { PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import {getLoginUserUsingGET, updateUserUsingPOST} from "@/services/hwqbi/userController";
import {addRewardUsingGET} from "@/services/hwqbi/rewardRecordController";
import {flushSync} from "react-dom";
import WebSocketComponent from "@/components/WebSocket";
import defaultSettings from "../../../config/defaultSettings";
import {
  getUserCurMonthAiRecordUsingGET,
  getUserCurMonthBiRecordUsingGET
} from "@/services/hwqbi/serviceRecordController";
import {cloneDeep} from "lodash";
import SendGiftModal from "@/components/Gift/SendGift";
import ImgCrop from "antd-img-crop";
import {errorConfig} from "@/requestErrorConfig";
import { history } from '@umijs/max';



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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);
  const [BiOption, setBiOption] = useState({
    title: '',
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
  const [open, setOpen] = useState(false)
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
      console.log(res.data)
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
      ...values,
      userAvatar: fileList[0] === undefined ? undefined : fileList[0].url
    };
    const res = await updateUserUsingPOST(params)
    if (res.code === 0) {
      getCurrentUser();
      message.success('修改成功')
    } else {
      message.error('修改失败')
    }

    setSubmitting(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('-') + 1));
  };

  const uploadButton = () => {
    return (
      <div>
        <PlusOutlined/>
        <div style={{marginTop: 8}}>Upload</div>
      </div>
    );
  }


  const props: UploadProps = {
    name: 'file',
    withCredentials: true,
    action: `${errorConfig.baseURL}api/file/upload?biz=user_avatar`,
    onChange: async function ({file, fileList: newFileList}) {
      const {response} = file;
      console.log(response)
      if (file.response && response.data) {
        const {data: {status, url}} = response
        console.log(url)
        const updatedFileList = [...fileList];
        if (response.code !== 0 || status === 'error') {
          message.error(response.message);
          file.status = "error"
          updatedFileList[0] = {
            // @ts-ignore
            uid: currentUser?.userAccount,
            // @ts-ignore
            name: currentUser?.userAvatar ? currentUser?.userAvatar?.substring(currentUser?.userAvatar!.lastIndexOf('-') + 1) : "error",
            status: "error",
            percent: 100
          }
          setFileList(updatedFileList);
          return
        }
        file.status = status
        updatedFileList[0] = {
          // @ts-ignore
          uid: currentUser?.userAccount,
          // @ts-ignore
          name: currentUser?.userAvatar?.substring(currentUser?.userAvatar!.lastIndexOf('-') + 1),
          status: status,
          url: url,
          percent: 100
        }
        setFileList(updatedFileList);
      } else {
        setFileList(newFileList);
      }
    },
    listType: "picture-circle",
    onPreview: handlePreview,
    fileList: fileList,
    beforeUpload: beforeUpload,
    maxCount: 1,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };



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
                <ImgCrop
                  rotationSlider
                  quality={1}
                  aspectSlider
                  maxZoom={4}
                  cropShape={"round"}
                  zoomSlider
                  showReset
                >
                  <Upload {...props}>
                    {fileList.length >= 1 ? undefined : uploadButton()}
                  </Upload>
                </ImgCrop>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                  <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
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
                <Button type={"primary"}  size={'small'} style={{marginLeft: '20px'}} onClick={() => {setOpen(true)}}>获取更多</Button>
              </div>
            </div>
            <div style={{display: "flex", marginTop: "30px"}}>
              <div style={{display: "flex", alignItems: "center"}}>
                <Tooltip title="会员每日可免费分析10次">
                  <span>身份: {
                    currentUser?.userRole === 'vip' ? '会员' : '普通用户'
                  }
                  </span>
                </Tooltip>
              </div>
              <div>
                <Button type={"primary"} style={{marginLeft: '20px'}} onClick={() => {
                  history.push('/shop_list')
                }}>获取会员</Button>
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
      <SendGiftModal invitationCode={currentUser?.invitationCode} onCancel={() => {
        setOpen(false)
      }} open={open}/>
    </div>
  );
};
export default MyInfo;
