// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addOrder POST /api/order/add */
export async function addOrderUsingPost(
  body: API.OrderAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/order/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userCancelOrder POST /api/order/cancel */
export async function userCancelOrderUsingPost(
  body: API.OrderCancelRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/order/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserOrderById GET /api/order/get/byId */
export async function getUserOrderByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserOrderByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductOrder_>('/api/order/get/byId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserOrderByPage POST /api/order/list/page */
export async function listUserOrderByPageUsingPost(
  body: API.OrderQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductOrder_>('/api/order/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userPayOrder POST /api/order/pay */
export async function userPayOrderUsingPost(
  body: API.OrderPayRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/order/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
