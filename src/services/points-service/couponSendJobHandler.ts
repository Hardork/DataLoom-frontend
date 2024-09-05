// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 执行优惠券定时推送 GET /xxl-job/coupon-task/job */
export async function webExecute(options?: { [key: string]: any }) {
  return request<API.BaseResponseVoid>('/xxl-job/coupon-task/job', {
    method: 'GET',
    ...(options || {}),
  });
}
