// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /admin/coreDatasetGroup/get */
export async function get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCoreDatasetGroupDTO>('/admin/coreDatasetGroup/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/coreDatasetGroup/previewSql */
export async function previewSql(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.previewSqlParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMapStringList>('/admin/coreDatasetGroup/previewSql', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/coreDatasetGroup/save */
export async function save(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.saveParams,
  body: API.CoreDatasetGroupDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCoreDatasetGroupDTO>('/admin/coreDatasetGroup/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
