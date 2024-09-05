// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/aiRole/add */
export async function addAiRole(body: API.AiRoleAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/admin/aiRole/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/aiRole/delete */
export async function deleteAiRole(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/admin/aiRole/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/aiRole/get/vo */
export async function getAiRoleById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAiRoleByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAiRole>('/admin/aiRole/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/aiRole/list/page/vo */
export async function listAiRoleVoByPage(
  body: API.AiRoleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAiRole>('/admin/aiRole/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/aiRole/update */
export async function updateAiRole(
  body: API.AiRoleUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/aiRole/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
