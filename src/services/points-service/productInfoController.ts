// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /points-service/productInfo/add/point */
export async function addProductPointInfo(
  body: API.ProductPointAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/points-service/productInfo/add/point', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/productInfo/add/vip */
export async function addProductVipInfo(
  body: API.ProductVipAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/points-service/productInfo/add/vip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/productInfo/delete/point */
export async function deleteProductPointInfo(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/points-service/productInfo/delete/point', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/productInfo/delete/vip */
export async function deleteProductVipInfo(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/points-service/productInfo/delete/vip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /points-service/productInfo/get/point */
export async function getProductPointInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductPointInfoByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductPoint>('/points-service/productInfo/get/point', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /points-service/productInfo/get/vip */
export async function getProductVipInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductVipInfoByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductVip>('/points-service/productInfo/get/vip', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/productInfo/getByType */
export async function getProductPointInfoByType(
  body: API.GetByTypeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGetProductPointInfoByTypeVO>(
    '/points-service/productInfo/getByType',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /points-service/productInfo/list/point/page */
export async function listProductPointInfoByPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listProductPointInfoByPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductPoint>('/points-service/productInfo/list/point/page', {
    method: 'GET',
    params: {
      ...params,
      productInfoQueryRequest: undefined,
      ...params['productInfoQueryRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /points-service/productInfo/list/vip/page */
export async function listProductVipInfoByPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listProductVipInfoByPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductVip>('/points-service/productInfo/list/vip/page', {
    method: 'GET',
    params: {
      ...params,
      productInfoQueryRequest: undefined,
      ...params['productInfoQueryRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/productInfo/offline/point */
export async function offlineProductPointInfo(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/points-service/productInfo/offline/point', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/productInfo/offline/vip */
export async function offlineProductVipInfo(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/points-service/productInfo/offline/vip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/productInfo/online/point */
export async function onlineProductPointInfo(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/points-service/productInfo/online/point', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/productInfo/online/vip */
export async function onlineProductVipInfo(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/points-service/productInfo/online/vip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/productInfo/update/point */
export async function updateProductPointInfo(
  body: API.ProductPointUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/points-service/productInfo/update/point', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/productInfo/update/vip */
export async function updateProductVipInfo(
  body: API.ProductVipUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/points-service/productInfo/update/vip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
