// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 发出优惠券预约提醒请求 POST /points-service/CouponRemind/create */
export async function createCouponRemind(
  body: API.CouponTemplateRemindCreateReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/points-service/CouponRemind/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
