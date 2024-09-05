// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/datasource/checkValid */
export async function checkConnect(
  body: API.StructDatabaseConfiguration,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/datasource/checkValid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/datasource/getSchemas/${param0} */
export async function getSchemas(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSchemasParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseListString>(`/admin/datasource/getSchemas/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/datasource/previewData */
export async function previewData(body: API.PreviewDataRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponsePreviewData>('/admin/datasource/previewData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/datasource/save */
export async function saveDataSourceMetaInfo(
  body: API.StructDatabaseConfiguration,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/datasource/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
