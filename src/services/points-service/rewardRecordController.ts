// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /points-service/reward/add */
export async function addReward(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/points-service/reward/add', {
    method: 'GET',
    ...(options || {}),
  });
}
