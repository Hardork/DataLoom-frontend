// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUserAiRole POST /api/userAssistant/add */
export async function addUserAiRoleUsingPost(
  body: API.AiRoleAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/userAssistant/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUserAiRole POST /api/userAssistant/delete */
export async function deleteUserAiRoleUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/userAssistant/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserAiRoleById GET /api/userAssistant/get/vo */
export async function getUserAiRoleByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserAiRoleByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserCreateAssistant_>('/api/userAssistant/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserAiRoleVOByPage POST /api/userAssistant/list/page/vo */
export async function listUserAiRoleVoByPageUsingPost(
  body: API.AiRoleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserCreateAssistant_>('/api/userAssistant/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUserAiRole POST /api/userAssistant/update */
export async function updateUserAiRoleUsingPost(
  body: API.AiRoleUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/userAssistant/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
