// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/message/add */
export async function addUserMessage(
  body: API.UserMessageAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/admin/message/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/message/list */
export async function listUnReadMessage(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserMessage>('/admin/message/list', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/message/read */
export async function hasReadMessage(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/admin/message/read', {
    method: 'POST',
    ...(options || {}),
  });
}
