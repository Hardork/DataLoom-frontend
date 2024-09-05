// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /points-service/order/add */
export async function addOrder(body: API.OrderAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/points-service/order/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/order/cancel */
export async function userCancelOrder(
  body: API.OrderCancelRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/points-service/order/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /points-service/order/get/byId */
export async function getUserOrderById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserOrderByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductOrder>('/points-service/order/get/byId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/order/list/page */
export async function listUserOrderByPage(
  body: API.OrderQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductOrder>('/points-service/order/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/order/pay */
export async function userPayOrder(body: API.OrderPayRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/points-service/order/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
