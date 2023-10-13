import {
  Badge,
  Button,
  Card,
  Descriptions, DescriptionsProps,
  Popover,
} from 'antd';
import React, {useEffect, useState} from 'react';
import {useModel} from "@@/exports";

import WebSocketComponent from "@/components/WebSocket";
import {useParams} from "react-router";
import { getUserOrderByIdUsingGET} from "@/services/hwqbi/orderController";
import moment from "moment";

/**
 * 添加图表页面
 * @constructor
 */



const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
  {
    key: '4',
    label: 'Order time',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '5',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
  {
    key: '6',
    label: 'Status',
    children: <Badge status="processing" text="Running" />,
    span: 3,
  },
  {
    key: '7',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
  {
    key: '8',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '9',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '10',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];


const OrderDetail: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [orderInfo, setOrderInfo] = useState<API.ProductOrder>()
  const [orderId, setOrderId] = useState<number>()
  const [loading, setLoading] = useState(false);

  const param = useParams()

  const loadOrderInfo = async () => {
    setLoading(true)
    const res = await getUserOrderByIdUsingGET(param)
    if (res.data) {
      setOrderInfo(res.data)
      setLoading(false)
    }
  }


  // 钩子，页面加载触发
  useEffect(() => {
    // 加载订单信息
    loadOrderInfo()

  },[])


  return (
    <div className="add-chart">
      <WebSocketComponent userId={currentUser?.id}></WebSocketComponent>
      <Card>
        <Descriptions bordered  title="订单详情">
          <Descriptions.Item label="订单号">{orderInfo?.orderNo}</Descriptions.Item>
          <Descriptions.Item label="商品名称">{orderInfo?.orderName}</Descriptions.Item>
          <Descriptions.Item label="添加积分">{orderInfo?.addPoints}</Descriptions.Item>
          <Descriptions.Item label="支付类型">{orderInfo?.payType}</Descriptions.Item>
          <Descriptions.Item label="商品类型">{orderInfo?.productType == 0 ? '积分服务' : '商品服务'}</Descriptions.Item>
          <Descriptions.Item label="订单状态">{orderInfo?.status}</Descriptions.Item>
          <Descriptions.Item label="订单支付价">￥{orderInfo?.total}</Descriptions.Item>
          <Descriptions.Item label="订单创建时间">{moment(orderInfo?.createTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
          <Descriptions.Item label="订单过期时间">{moment(orderInfo?.expirationTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
        </Descriptions>
        <div style={{display: 'flex', justifyContent: 'end'}}>
          <div style={{marginTop: '16px'}}>
            <span>对订单有疑问？</span>
            <Popover content={<>
              <img src={'/assets/WxCode.jpg'} style={{height: '300px', width: '240px'}}/>
            </>} title="联系方式" trigger="click">
              <Button prefix={'有疑问？'}>联系站长</Button>
            </Popover>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default OrderDetail;
