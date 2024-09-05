// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/datasource/tree/add */
export async function addDatasourceDirNode(
  body: API.AddDatasourceDirRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/datasource/tree/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/datasource/tree/delete */
export async function deleteDatasourceDirNode(
  body: API.DeleteDatasourceDirNodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/datasource/tree/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/datasource/tree/move */
export async function moveDatasourceDirNode(
  body: API.MoveDatasourceDirNodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/datasource/tree/move', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/datasource/tree/tree */
export async function listDatasourceDirTree(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDatasourceTreeVO>('/admin/datasource/tree/tree', {
    method: 'GET',
    ...(options || {}),
  });
}
