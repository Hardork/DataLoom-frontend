// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询优惠券推送任务详情 GET /points-service/couponTask/find */
export async function findCouponTaskById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findCouponTaskByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCouponTask>('/points-service/couponTask/find', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /points-service/couponTask/manual/send */
export async function manuallySendCouponTask(
  body: API.CouponTaskCreateReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid>('/points-service/couponTask/manual/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询优惠券推送任务 GET /points-service/couponTask/page */
export async function pageQueryCouponTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryCouponTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCouponTask>('/points-service/couponTask/page', {
    method: 'GET',
    params: {
      ...params,
      requestParam: undefined,
      ...params['requestParam'],
    },
    ...(options || {}),
  });
}
