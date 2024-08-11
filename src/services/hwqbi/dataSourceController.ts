// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** checkConnect POST /api/datasource/checkValid */
export async function checkConnectUsingPost(
  body: API.DataSourceConfig,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/datasource/checkValid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getSchemas GET /api/datasource/getSchemas/${param0} */
export async function getSchemasUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSchemasUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseListString_>(`/api/datasource/getSchemas/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** previewData POST /api/datasource/previewData */
export async function previewDataUsingPost(
  body: API.PreviewDataRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePreviewData_>('/api/datasource/previewData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** saveDataSourceMetaInfo POST /api/datasource/save */
export async function saveDataSourceMetaInfoUsingPost(
  body: API.DataSourceConfig,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/datasource/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
