// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户创建AI对话 POST /api/Ai/add/history */
export async function addUserChatHistoryUsingPOST(
  body: API.AddUserChatHistory,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/Ai/add/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询用户是否添加了该聊天 POST /api/Ai/chat/add */
export async function userAddChatUsingPOST(
  body: API.UserAddChatRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/Ai/chat/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

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

/** 用户会话聊天 POST /api/Ai/chat/model */
export async function userChatWithModelUsingPOST(
  body: API.ChatWithModelRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/Ai/chat/model', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** chatWithTemp POST /api/Ai/chat/temp */
export async function chatWithTempUsingPOST(
  body: API.AiTempChatRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/Ai/chat/temp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询用户选择对话的信息 POST /api/Ai/get/chat */
export async function getChatByIdUsingPOST(
  body: API.GetChatRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGetUserChatHistoryVO_>('/api/Ai/get/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户获取AI对话历史 POST /api/Ai/get/chatRecord */
export async function getUserChatRecordUsingPOST(
  body: API.GetUserChatRecordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChatHistory_>('/api/Ai/get/chatRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户创建的AI对话 GET /api/Ai/get/history */
export async function getUserChatHistoryUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListGetUserChatHistoryVO_>('/api/Ai/get/history', {
    method: 'GET',
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
