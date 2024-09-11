// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加仪表盘 POST /admin/dashboard/add */
export async function addDashboard(
  body: API.AddDashboardRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/dashboard/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建图表 POST /admin/dashboard/addChart */
export async function addChart(body: API.AddDashboardRequestDTO, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/admin/dashboard/addChart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取仪表盘所有的图表 GET /admin/dashboard/list */
export async function listAllChart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listAllChartParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/dashboard/list', {
    method: 'GET',
    params: {
      ...params,
      addDashboardRequestDTO: undefined,
      ...params['addDashboardRequestDTO'],
    },
    ...(options || {}),
  });
}
