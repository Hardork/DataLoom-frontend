// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addReward GET /api/reward/add */
export async function addRewardUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/reward/add', {
    method: 'GET',
    ...(options || {}),
  });
}
