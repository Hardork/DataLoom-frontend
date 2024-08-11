// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 链接获取数据集权限 GET /api/data/${param0}/${param2}/${param1} */
export async function getOtherUserDataUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOtherUserDataUsingGETParams,
  options?: { [key: string]: any },
) {
  const { dataId: param0, secret: param1, type: param2, ...queryParams } = params;
  return request<API.BaseResponseBoolean_>(`/api/data/${param0}/${param2}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 添加记录 POST /api/data/add */
export async function addOneRecordUsingPost(
  body: API.AddChardDataRecordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/data/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除记录 POST /api/data/delete */
export async function deleteRecordByIdUsingPost(
  body: API.DeleteChartDataRecordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/data/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户数据集 POST /api/data/delete/userData */
export async function deleteUserDataUsingPost(
  body: API.DeleteUserDataRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/data/delete/userData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改记录 POST /api/data/edit */
export async function editRecordByIdUsingPost(
  body: API.EditChartDataRecordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/data/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看数据协作者 GET /api/data/list/collaborators/${param0} */
export async function getDataCollaboratorsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDataCollaboratorsUsingGETParams,
  options?: { [key: string]: any },
) {
  const { dataId: param0, ...queryParams } = params;
  return request<API.BaseResponseListDataCollaboratorsVO_>(
    `/api/data/list/collaborators/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 显示用户所有数据集 GET /api/data/list/data/info */
export async function listUserDataInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserData_>('/api/data/list/data/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 显示用户MySQL数据集 GET /api/data/list/data/info/mysql */
export async function listUserMySqlDataInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserData_>('/api/data/list/data/info/mysql', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页查询 POST /api/data/list/page */
export async function listUserDataByPageUsingPost(
  body: API.DataQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDataPage_>('/api/data/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 预览上传数据 POST /api/data/preview */
export async function previewAndCheckExcelInfoUsingPost(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponsePreviewExcelDataVO_>('/api/data/preview', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 共享用户数据集 POST /api/data/share/userData */
export async function shareUserDataUsingPost(
  body: API.ShareUserDataRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/data/share/userData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户上传数据集 POST /api/data/upload */
export async function uploadFileToMongoUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadFileToMongoUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseLong_>('/api/data/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 用户上传数据集到MySQL POST /api/data/upload/mysql */
export async function uploadFileToMySqlUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadFileToMySQLUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseLong_>('/api/data/upload/mysql', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
