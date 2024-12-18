// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户创建智能问数对话 POST /admin/Ai/add/askSql/history */
export async function addUserAskSqlHistory(
  body: API.AddUserAskSqlHistoryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/Ai/add/askSql/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户创建AI对话 POST /admin/Ai/add/history */
export async function addUserChatHistory(
  body: API.AddUserChatHistory,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/Ai/add/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询用户是否添加了该聊天 POST /admin/Ai/chat/add */
export async function userAddChat(body: API.UserAddChatRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/admin/Ai/chat/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/Ai/chat/assistant */
export async function chatWithAssistant(body: API.AiChatRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/admin/Ai/chat/assistant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户会话聊天 POST /admin/Ai/chat/model */
export async function userChatWithModel(
  body: API.ChatWithModelRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/Ai/chat/model', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 智能问数 POST /admin/Ai/chat/sql */
export async function userChatForSql(
  body: API.ChatForSQLRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/Ai/chat/sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 智能问数分页查询 POST /admin/Ai/chat/sql/page */
export async function queryUserChatForSql(
  body: API.ChatForSQLPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCustomPageMapStringObject>('/admin/Ai/chat/sql/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/Ai/chat/temp */
export async function chatWithTemp(body: API.AiTempChatRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/admin/Ai/chat/temp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户智能问数对话 DELETE /admin/Ai/delete/askSql/history/${param0} */
export async function deleteUserAskSqlHistory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserAskSqlHistoryParams,
  options?: { [key: string]: any },
) {
  const { chatId: param0, ...queryParams } = params;
  return request<API.BaseResponseBoolean>(`/admin/Ai/delete/askSql/history/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询用户选择对话的信息 POST /admin/Ai/get/chat */
export async function getChatById(body: API.GetChatRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseGetUserChatHistoryVO>('/admin/Ai/get/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户获取AI对话历史 POST /admin/Ai/get/chatRecord */
export async function getUserChatRecord(
  body: API.GetUserChatRecordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChatHistory>('/admin/Ai/get/chatRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户创建的AI对话 GET /admin/Ai/get/history */
export async function getUserChatHistory(options?: { [key: string]: any }) {
  return request<API.BaseResponseListGetUserChatHistoryVO>('/admin/Ai/get/history', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 智能问数单条对话分页查询 GET /admin/Ai/get/singleHistory/pageData/${param0}/${param1} */
export async function getSingleHistoryPageData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSingleHistoryPageDataParams,
  options?: { [key: string]: any },
) {
  const { chatHistoryId: param0, pageNo: param1, ...queryParams } = params;
  return request<API.BaseResponseCustomPageMapStringObject>(
    `/admin/Ai/get/singleHistory/pageData/${param0}/${param1}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 用户获取AI对话历史 POST /admin/Ai/get/sql/chatRecord */
export async function getUserSqlChatRecord(
  body: API.GetUserChatRecordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListGetUserSQLChatRecordVO>('/admin/Ai/get/sql/chatRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/Ai/talk */
export async function getAiTalk(body: API.AiChatRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/admin/Ai/talk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
