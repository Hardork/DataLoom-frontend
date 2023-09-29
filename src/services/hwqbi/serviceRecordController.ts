// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询当前月份用户Ai服务调用情况 GET /api/serviceRecord/curMonthRecord/Ai */
export async function getUserCurMonthAiRecordUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseGetCurMonthServiceRecordVO_>(
    '/api/serviceRecord/curMonthRecord/Ai',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 查询当前月份用户Bi服务调用情况 GET /api/serviceRecord/curMonthRecord/Bi */
export async function getUserCurMonthBiRecordUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseGetCurMonthServiceRecordVO_>(
    '/api/serviceRecord/curMonthRecord/Bi',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
