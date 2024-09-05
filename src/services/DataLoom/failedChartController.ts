// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/failed_chart/list/page */
export async function listFailedChartsByPage(
  body: API.FailedChartQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageFailedChart>('/admin/failed_chart/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
