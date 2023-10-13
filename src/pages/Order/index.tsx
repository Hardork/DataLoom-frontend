import {
  Button,
  Card,
  Col,
  Row,
} from 'antd';
import React, {useEffect, useState} from 'react';
import {useModel} from "@@/exports";

import { message } from 'antd';
import WebSocketComponent from "@/components/WebSocket";
import {
  getProductPointInfoByTypeUsingPOST,
} from "@/services/hwqbi/productInfoController";
import {useParams} from "react-router";
import {addOrderUsingPOST, userPayOrderUsingPOST} from "@/services/hwqbi/orderController";

/**
 * 添加图表页面
 * @constructor
 */






const Order: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [productInfo, setProductInfo] = useState<API.GetProductPointInfoByTypeVO>()
  const [orderId, setOrderId] = useState<number>()
  const [loading, setLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  const param = useParams()

  const loadProductInfo = async () => {
    setLoading(true)
    const res = await getProductPointInfoByTypeUsingPOST(param)
    if (res.data) {
      setProductInfo(res.data)
      if (res.data.id) {
        const addParam:API.OrderAddRequest = {
          productId: res.data.id,
          productType: param.type
        }
        const addRes = await addOrderUsingPOST(addParam)
        if (addRes.code === 0) {
          console.log(res.data)
          setOrderId(addRes.data)
          setLoading(false)
        } else {
          message.error('生成订单失败')
        }
      }
    }
  }

  const payOrder = async () => {
    setPayLoading(true)
    const OrderPayRequest = {
      id: orderId
    };
    const res = await userPayOrderUsingPOST(OrderPayRequest)
    if (res.code === 0) {
      message.success('购买成功')
    } else {
      message.error('购买失败')
    }
    setPayLoading(false)
  }

  // 钩子，页面加载触发
  useEffect(() => {
    // 加载商品信息
    loadProductInfo()
    // 生成订单信息

  },[])


  return (
    <div className="add-chart">
      <WebSocketComponent userId={currentUser?.id}></WebSocketComponent>
      <Row gutter={24} style={{display: "flex", justifyContent: 'center'}}>
        <Col span={12}>
          <Card title="商品">
            <div style={{height: '54px', display: 'flex',width: '100%'}}>
              <div style={{width: '54px'}}>
                <img src={'/logo.png'} style={{width: '100%'}}/>
              </div>
              <div style={{width: '80%', display: "flex", justifyContent: "space-between"}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <div style={{fontSize: '16px', fontWeight: 'bold'}}>{productInfo?.name}</div>
                  <div>{productInfo?.description}</div>
                </div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "end"}}>
                  <div style={{fontSize: '16px', color: '#f55f4e'}}>
                    ￥ {productInfo?.total / 100}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{display: "flex", justifyContent: 'center', marginTop: '16px'}}>
        <Col span={12}>
          <Card title="支付二维码" loading={loading}>
            <div style={{display: "flex", padding: '12px', border: '1px solid #1890ff', borderRadius: '5px', width: '200px'}}>
              <div>
                <img style={{height: '24px'}} src={'data:image/png;base64,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'}/>
              </div>
              <div style={{height: '24px', lineHeight: '24x', marginLeft: '16px'}}>
                <span>微信支付</span>
              </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: '16px'}}>
              <img src={'/assets/code.png'}/>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
              扫码完成后，点击下方已付款，即可购买成功
            </div>
            <div>
              <Button loading={payLoading} onClick={() => {
                payOrder()
              }}>已付款</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Order;
