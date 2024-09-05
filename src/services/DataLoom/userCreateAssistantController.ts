// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/userAssistant/add */
export async function addUserAiRole(body: API.AiRoleAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/admin/userAssistant/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/userAssistant/delete */
export async function deleteUserAiRole(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/admin/userAssistant/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/userAssistant/get/vo */
export async function getUserAiRoleById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserAiRoleByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserCreateAssistant>('/admin/userAssistant/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/userAssistant/list/page/vo */
export async function listUserAiRoleVoByPage(
  body: API.AiRoleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserCreateAssistant>('/admin/userAssistant/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/userAssistant/update */
export async function updateUserAiRole(
  body: API.AiRoleUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/userAssistant/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
