// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 领取优惠券 POST /points-service/userCoupon/claim */
export async function userClaimCoupon(
  body: API.UserClaimCouponDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid>('/points-service/userCoupon/claim', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
