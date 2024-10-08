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

/** 添加图表 POST /admin/dashboard/addChart */
export async function addDashboardChart(
  body: API.AddDashboardChartRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/admin/dashboard/addChart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除图表 POST /admin/dashboard/deleteChart */
export async function deleteChart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteChartParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/dashboard/deleteChart', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/dashboard/deleteDashboard */
export async function deleteDashboard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDashboardParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/dashboard/deleteDashboard', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑图表 POST /admin/dashboard/editChart */
export async function editChart(
  body: API.EditDashboardChartRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/dashboard/editChart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id图表获取智能分析报告 GET /admin/dashboard/getChartAnalysis */
export async function getChartAnalysis(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartAnalysisParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGetChartDataVO>('/admin/dashboard/getChartAnalysis', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据配置获取图表数据 POST /admin/dashboard/getChartData */
export async function getChartData(
  body: API.GetChartDataRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGetChartDataVO>('/admin/dashboard/getChartData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id获取图表数据 GET /admin/dashboard/getChartDataById */
export async function getChartDataById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartDataByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseGetChartDataVO>('/admin/dashboard/getChartDataById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据id查询仪表盘 GET /admin/dashboard/getDashboardById */
export async function getDashboardById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDashboardByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDashboard>('/admin/dashboard/getDashboardById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取仪表盘所有的图表 GET /admin/dashboard/listAllChart */
export async function listAllChart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listAllChartParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChartOption>('/admin/dashboard/listAllChart', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 展示用户所有仪表盘 GET /admin/dashboard/listAllDashboard */
export async function listAllDashboard(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDashboard>('/admin/dashboard/listAllDashboard', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 保存仪表盘配置 POST /admin/dashboard/save */
export async function saveDashboard(
  body: API.SaveDashboardRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/dashboard/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
