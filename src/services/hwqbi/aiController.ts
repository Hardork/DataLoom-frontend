// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** chatWithAssistant POST /api/Ai/chat/assistant */
export async function chatWithAssistantUsingPOST(
  body: API.AiChatRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/Ai/chat/assistant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getChat POST /api/Ai/getChat */
export async function getChatUsingPOST(body: API.AiChatRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/Ai/getChat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAiTalk POST /api/Ai/talk */
export async function getAiTalkUsingPOST(
  body: API.AiChatRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/Ai/talk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
