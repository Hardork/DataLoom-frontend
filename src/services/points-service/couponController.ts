// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建优惠券模板 POST /points-service/coupon/create */
export async function createCouponTemplate(
  body: API.CouponTemplateSaveReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/points-service/coupon/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询优惠券模板详情 GET /points-service/coupon/getById */
export async function findCouponTemplate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findCouponTemplateParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCouponTemplateQueryVO>('/points-service/coupon/getById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 增加优惠券模板发行量 POST /points-service/coupon/increase-number */
export async function increaseNumberCouponTemplate(
  body: API.CouponTemplateNumberReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid>('/points-service/coupon/increase-number', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询优惠券模板 GET /points-service/coupon/page */
export async function pageQueryCouponTemplate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryCouponTemplateParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCouponTemplate>('/points-service/coupon/page', {
    method: 'GET',
    params: {
      ...params,
      requestParam: undefined,
      ...params['requestParam'],
    },
    ...(options || {}),
  });
}

/** 结束优惠券模板 POST /points-service/coupon/terminate */
export async function terminateCouponTemplate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.terminateCouponTemplateParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid>('/points-service/coupon/terminate', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
