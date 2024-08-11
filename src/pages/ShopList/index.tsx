import { Button, Card, Col, Divider, message, Row, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { history, useModel } from '@@/exports';

import WebSocketComponent from '@/components/WebSocket';
import { ColumnsType } from 'antd/es/table';
import {
  listProductPointInfoByPageUsingGet,
  listProductVipInfoByPageUsingGet,
} from '@/services/hwqbi/productInfoController';
import './index.css';
import {getLoginUserUsingGet} from "@/services/hwqbi/userController";
import {flushSync} from "react-dom";
import Settings from "../../../config/defaultSettings";

/**
 * 添加图表页面
 * @constructor
 */

const ShopList: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};

  const [curPointProduct, setCurPointProduct] = useState<API.ProductPoint>();
  const [curVipProduct, setCurVipProduct] = useState<API.ProductVip>();

  const [pointProductList, setPointProductList] = useState<API.ProductPoint[]>();
  const [vipProductList, setVipProductList] = useState<API.ProductVip[]>();

  interface DataType {
    key: string;
    function: string;
    normal: string;
    Vip: string;
    SVip: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '功能',
      dataIndex: 'function',
      key: 'function',
    },
    {
      title: '普通用户',
      dataIndex: 'normal',
      key: 'normal',
    },
    {
      title: '会员',
      dataIndex: 'Vip',
      key: 'Vip',
    },
    {
      title: '超级会员',
      key: 'SVip',
      dataIndex: 'SVip',
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      function: '每日领取积分',
      normal: '10',
      Vip: '20',
      SVip: '40',
    },
    {
      key: '2',
      function: '对话回复最大词数',
      normal: '2048',
      Vip: '2048',
      SVip: '4096',
    },
    {
      key: '3',
      function: '分析图表保存天数',
      normal: '10 天',
      Vip: '30 天',
      SVip: '60 天',
    },
    {
      key: '4',
      function: '对话消息保存天数',
      normal: '10 天',
      Vip: '30 天',
      SVip: '60 天',
    },
  ];

  const getVipProduct = async () => {
    const res = await listProductVipInfoByPageUsingGet({});
    if (res.data) {
      setVipProductList(res.data.records);
      if (res.data.records && res.data.records.length > 0) {
        setCurVipProduct(res.data.records[0]);
      }
    } else {
      message.error('获取会员商品失败');
    }
    return;
  };

  const getPointProduct = async () => {
    const res = await listProductPointInfoByPageUsingGet({});
    if (res.data) {
      setPointProductList(res.data.records);
      if (res.data.records && res.data.records.length > 0) {
        setCurPointProduct(res.data.records[0]);
      }
    } else {
      message.error('获取积分商品失败');
    }
    return;
  };

  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGet();
    if (userInfo) {
      flushSync(() => {
        // @ts-ignore
        console.log('用户信息', userInfo);
        setInitialState({
          currentUser: userInfo.data,
          settings: Settings,
        });
      });
    }
  };

  useEffect(() => {
    // 记载用户信息
    // 加载商品信息
    fetchUserInfo();
    getPointProduct();
    getVipProduct();
  }, []);

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
    };
    console.log(params);
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <WebSocketComponent userId={currentUser?.id}></WebSocketComponent>
      <Row gutter={24}>
        <Col span={24}>
          <Card title="积分详情">
            <div>
              <Tooltip title="1积分可调用一次AI服务，2积分可调用一次BI分析">
                <span>积 分： {currentUser?.totalRewardPoints}</span>
              </Tooltip>
            </div>
            <div style={{ marginBottom: '16px' }}></div>
            <div>身份: {
              currentUser?.userRole === 'vip' ? '会员' : '普通用户'
            }</div>
          </Card>
        </Col>
      </Row>
      <Divider></Divider>
      <Card title={'积分区'}>
        <Row gutter={24}>
          {pointProductList?.map((item) => (
            <>
              <Col span={8}>
                <Card
                  style={
                    item.id === curPointProduct?.id
                      ? { backgroundColor: '#4056cb', color: '#ffffff', marginTop: '16px' }
                      : { backgroundColor: '#f2f2ff', marginTop: '16px' }
                  }
                  onClick={() => {
                    setCurPointProduct(item);
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '20x' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      ￥ {item.total}.0
                    </div>
                    <div>
                      <s>原价: ￥ {item.originalTotal}.0</s>
                    </div>
                  </div>
                </Card>
              </Col>
            </>
          ))}
          <>
            <div
              style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '16px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  实付{' '}
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    ￥{curPointProduct?.total}.0
                  </span>
                </div>
                <div style={{ marginLeft: '16px' }}>
                  <Button
                    type={'primary'}
                    onClick={() => {
                      history.push('/order/' + curPointProduct?.id + '/' + 0);
                    }}
                  >
                    立即购买
                  </Button>
                </div>
              </div>
            </div>
          </>
        </Row>
      </Card>
      <Divider></Divider>
      <Card title={'会员区'}>
        <Row gutter={24}>
          {vipProductList?.map((item) => (
            <>
              <Col span={8}>
                <Card
                  style={
                    item.id === curVipProduct?.id
                      ? { backgroundColor: '#4056cb', color: '#ffffff', marginTop: '16px' }
                      : { backgroundColor: '#f2f2ff', marginTop: '16px' }
                  }
                  onClick={() => {
                    setCurVipProduct(item);
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '20x' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      ￥ {item.total}.0
                    </div>
                    <div>
                      <s>原价: ￥ {item.originalTotal}.0</s>
                    </div>
                  </div>
                </Card>
              </Col>
            </>
          ))}

          <>
            <div
              style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '16px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  实付{' '}
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    ￥{curVipProduct?.total}.0
                  </span>
                </div>
                <div style={{ marginLeft: '16px' }}>
                  <Button
                    type={'primary'}
                    onClick={() => {
                      history.push('/order/' + curVipProduct?.id + '/' + 1);
                    }}
                  >
                    立即购买
                  </Button>
                </div>
              </div>
            </div>
          </>
        </Row>
      </Card>
      <Divider></Divider>
      <Card title={'会员特权'}>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};
export default ShopList;
