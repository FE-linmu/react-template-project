import request from '@/utils/request';

// 函返回的结果是 Promise 对象
export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser'); // 获取当前用户
}

export async function queryDetail(): Promise<any> {
  return request('/api/getUserDetail');
}

export async function fakeAccountLogout(): Promise<any> {
  return request('/api/logout');
}
