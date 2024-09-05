// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 链接获取数据集权限 GET /admin/data/${param0}/${param1}/${param2} */
export async function getOtherUserData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOtherUserDataParams,
  options?: { [key: string]: any },
) {
  const { dataId: param0, type: param1, secret: param2, ...queryParams } = params;
  return request<API.BaseResponseBoolean>(`/admin/data/${param0}/${param1}/${param2}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 添加记录 POST /admin/data/add */
export async function addOneRecord(
  body: API.AddChardDataRecordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/data/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除记录 POST /admin/data/delete */
export async function deleteRecordById(
  body: API.DeleteChartDataRecordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/data/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户数据集 POST /admin/data/delete/userData */
export async function deleteUserData(
  body: API.DeleteUserDataRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/data/delete/userData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改记录 POST /admin/data/edit */
export async function editRecordById(
  body: API.EditChartDataRecordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/admin/data/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看数据协作者 GET /admin/data/list/collaborators/${param0} */
export async function getDataCollaborators(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDataCollaboratorsParams,
  options?: { [key: string]: any },
) {
  const { dataId: param0, ...queryParams } = params;
  return request<API.BaseResponseListDataCollaboratorsVO>(
    `/admin/data/list/collaborators/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 显示用户所有数据集 GET /admin/data/list/data/info */
export async function listUserDataInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserData>('/admin/data/list/data/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 显示用户MySQL数据集 GET /admin/data/list/data/info/mysql */
export async function listUserMySqlDataInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserData>('/admin/data/list/data/info/mysql', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页查询 POST /admin/data/list/page */
export async function listUserDataByPage(
  body: API.DataQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDataPage>('/admin/data/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 预览上传数据 POST /admin/data/preview */
export async function previewAndCheckExcelInfo(body: {}, options?: { [key: string]: any }) {
  return request<API.BaseResponsePreviewExcelDataVO>('/admin/data/preview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 共享用户数据集 POST /admin/data/share/userData */
export async function shareUserData(
  body: API.ShareUserDataRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString>('/admin/data/share/userData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户上传数据集 POST /admin/data/upload */
export async function uploadFileToMongo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadFileToMongoParams,
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/admin/data/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
      uploadUserDataRequest: undefined,
      ...params['uploadUserDataRequest'],
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户上传数据集到MySQL POST /admin/data/upload/mysql */
export async function uploadFileToMySql(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadFileToMySQLParams,
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/admin/data/upload/mysql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
      uploadUserDataRequest: undefined,
      ...params['uploadUserDataRequest'],
    },
    data: body,
    ...(options || {}),
  });
}
