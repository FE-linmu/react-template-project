/*
 * @Descripttion: 用户信息的api层
 * @version: 0.0.1
 * @Author: 林慕
 * @Date: 2020-08-30 22:58:57
 * @LastEditors: 林慕
 * @LastEditTime: 2020-09-08 09:45:30
 */
import request from '@/utils/request';
//
export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser'); // 获取当前用户
}

export async function queryDetail(): Promise<any> {
  return request('/api/getUserDetail');
}

export async function fakeAccountLogout(): Promise<any> {
  return request('/api/logout');
}
