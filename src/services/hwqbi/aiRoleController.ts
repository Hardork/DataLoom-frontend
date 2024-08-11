// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addAiRole POST /api/aiRole/add */
export async function addAiRoleUsingPost(
  body: API.AiRoleAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/aiRole/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteAiRole POST /api/aiRole/delete */
export async function deleteAiRoleUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/aiRole/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAiRoleById GET /api/aiRole/get/vo */
export async function getAiRoleByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAiRoleByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAiRole_>('/api/aiRole/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listAiRoleVOByPage POST /api/aiRole/list/page/vo */
export async function listAiRoleVoByPageUsingPost(
  body: API.AiRoleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAiRole_>('/api/aiRole/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateAiRole POST /api/aiRole/update */
export async function updateAiRoleUsingPost(
  body: API.AiRoleUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/aiRole/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
