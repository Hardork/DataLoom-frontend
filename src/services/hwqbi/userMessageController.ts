// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUserMessage POST /api/message/add */
export async function addUserMessageUsingPOST(
  body: API.UserMessageAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/message/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listUnReadMessage POST /api/message/list */
export async function listUnReadMessageUsingPOST(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserMessage_>('/api/message/list', {
    method: 'POST',
    ...(options || {}),
  });
}

/** hasReadMessage POST /api/message/read */
export async function hasReadMessageUsingPOST(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/message/read', {
    method: 'POST',
    ...(options || {}),
  });
}
