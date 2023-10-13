// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addProductPointInfo POST /api/productInfo/add/point */
export async function addProductPointInfoUsingPOST(
  body: API.ProductPointAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/productInfo/add/point', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addProductVipInfo POST /api/productInfo/add/vip */
export async function addProductVipInfoUsingPOST(
  body: API.ProductVipAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/productInfo/add/vip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteProductPointInfo POST /api/productInfo/delete/point */
export async function deleteProductPointInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/productInfo/delete/point', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteProductVipInfo POST /api/productInfo/delete/vip */
export async function deleteProductVipInfoUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/productInfo/delete/vip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getProductPointInfoById GET /api/productInfo/get/point */
export async function getProductPointInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductPointInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductPoint_>('/api/productInfo/get/point', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getProductVipInfoById GET /api/productInfo/get/vip */
export async function getProductVipInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductVipInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductVip_>('/api/productInfo/get/vip', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getProductPointInfoByType POST /api/productInfo/getByType */
export async function getProductPointInfoByTypeUsingPOST(
  body: API.GetByTypeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGetProductPointInfoByTypeVO_>('/api/productInfo/getByType', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listProductPointInfoByPage GET /api/productInfo/list/point/page */
export async function listProductPointInfoByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listProductPointInfoByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductPoint_>('/api/productInfo/list/point/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listProductVipInfoByPage GET /api/productInfo/list/vip/page */
export async function listProductVipInfoByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listProductVipInfoByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductVip_>('/api/productInfo/list/vip/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** offlineProductPointInfo POST /api/productInfo/offline/point */
export async function offlineProductPointInfoUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/productInfo/offline/point', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** offlineProductVipInfo POST /api/productInfo/offline/vip */
export async function offlineProductVipInfoUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/productInfo/offline/vip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** onlineProductPointInfo POST /api/productInfo/online/point */
export async function onlineProductPointInfoUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/productInfo/online/point', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** onlineProductVipInfo POST /api/productInfo/online/vip */
export async function onlineProductVipInfoUsingPOST(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/productInfo/online/vip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateProductPointInfo POST /api/productInfo/update/point */
export async function updateProductPointInfoUsingPOST(
  body: API.ProductPointUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/productInfo/update/point', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateProductVipInfo POST /api/productInfo/update/vip */
export async function updateProductVipInfoUsingPOST(
  body: API.ProductVipUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/productInfo/update/vip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
