// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /admin/datasetTable/getByDatasource */
export async function getByDatasource(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByDatasourceParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCoreDatasourceTask>('/admin/datasetTable/getByDatasource', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
