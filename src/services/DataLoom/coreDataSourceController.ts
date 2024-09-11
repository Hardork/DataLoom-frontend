// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/coreDatasource/add */
export async function addDatasource(
  body: {
    datasourceDTO: API.DatasourceDTO;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/admin/coreDatasource/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 校验数据源 POST /admin/coreDatasource/check */
export async function checkDatasource(body: API.DatasourceDTO, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/admin/coreDatasource/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/coreDatasource/get */
export async function getDataSource(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDataSourceParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDatasourceDTO>('/admin/coreDatasource/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/coreDatasource/getTableFields */
export async function getTableFieldsByDatasourceIdAndTableName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTableFieldsByDatasourceIdAndTableNameParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCoreDatasetTableField>(
    '/admin/coreDatasource/getTableFields',
    {
      method: 'GET',
      params: {
        ...params,
        getTableFieldsDTO: undefined,
        ...params['getTableFieldsDTO'],
      },
      ...(options || {}),
    },
  );
}

/** 获取数据源所有表信息 GET /admin/coreDatasource/getTables */
export async function getTablesByDatasourceId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTablesByDatasourceIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCoreDatasetTable>('/admin/coreDatasource/getTables', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/coreDatasource/handleApiResponse */
export async function handleApiResponse(body: API.ApiDefinition, options?: { [key: string]: any }) {
  return request<API.BaseResponseApiDefinition>('/admin/coreDatasource/handleApiResponse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 展示用户数据源列表 GET /admin/coreDatasource/list */
export async function listUserDataSource(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCoreDatasource>('/admin/coreDatasource/list', {
    method: 'GET',
    ...(options || {}),
  });
}
