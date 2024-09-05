// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询当前月份用户Ai服务调用情况 GET /admin/serviceRecord/curMonthRecord/Ai */
export async function getUserCurMonthAiRecord(options?: { [key: string]: any }) {
  return request<API.BaseResponseGetCurMonthServiceRecordVO>(
    '/admin/serviceRecord/curMonthRecord/Ai',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 查询当前月份用户Bi服务调用情况 GET /admin/serviceRecord/curMonthRecord/Bi */
export async function getUserCurMonthBiRecord(options?: { [key: string]: any }) {
  return request<API.BaseResponseGetCurMonthServiceRecordVO>(
    '/admin/serviceRecord/curMonthRecord/Bi',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
