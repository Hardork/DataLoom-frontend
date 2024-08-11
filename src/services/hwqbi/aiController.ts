// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户创建智能问数对话 POST /api/Ai/add/askSql/history */
export async function addUserAskSqlHistoryUsingPost(
  body: API.AddUserAskSqlHistoryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/Ai/add/askSql/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户创建AI对话 POST /api/Ai/add/history */
export async function addUserChatHistoryUsingPost(
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
export async function userAddChatUsingPost(
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
export async function chatWithAssistantUsingPost(
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
export async function userChatWithModelUsingPost(
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

/** 智能问数 POST /api/Ai/chat/sql */
export async function userChatForSqlUsingPost(
  body: API.ChatForSQLRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/Ai/chat/sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** chatWithTemp POST /api/Ai/chat/temp */
export async function chatWithTempUsingPost(
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
export async function getChatByIdUsingPost(
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
export async function getUserChatRecordUsingPost(
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
export async function getUserChatHistoryUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListGetUserChatHistoryVO_>('/api/Ai/get/history', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户获取AI对话历史 POST /api/Ai/get/sql/chatRecord */
export async function getUserSqlChatRecordUsingPost(
  body: API.GetUserChatRecordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListGetUserSQLChatRecordVO_>('/api/Ai/get/sql/chatRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAiTalk POST /api/Ai/talk */
export async function getAiTalkUsingPost(
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
