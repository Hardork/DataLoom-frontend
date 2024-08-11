// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listFailedChartsByPage POST /api/failed_chart/list/page */
export async function listFailedChartsByPageUsingPost(
  body: API.FailedChartQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageFailedChart_>('/api/failed_chart/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
