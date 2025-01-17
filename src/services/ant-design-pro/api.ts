// @ts-ignore
/* eslint-disable */
import request from 'umi-request';
import { v4 as uuid } from 'uuid';
import message from 'antd/lib/message';
import { ResponseHandler, WheelGlobal } from 'rdjs-wheel';

request.interceptors.request.use((url,options)=>{
  let token = localStorage.getItem(WheelGlobal.ACCESS_TOKEN_NAME);
  if (null === token) {
      token = '';
  }
  const authHeader = { 
    'Authorization': 'Bearer ' + `${token}`,
    "x-request-id": uuid()
  };
  return {
    url: url,
    options: { ...options, interceptors: true, headers: authHeader },
  };
});

request.interceptors.response.use(async (response, options) => {
  const data = await response.clone().json();
  if(data.resultCode === '00100100004016'){
    window.location.href = "/user/login";
  }
  if(ResponseHandler.responseSuccess(data)){
    return response;
  }else{
    errorNotification(data);
  }
  return response;
});


function errorNotification(data:API.ApiResponse) {
  if(data.resultCode != '200' && data.msg != 'ok'){
    message.error(data.msg);
  }
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  let userResponse = await request<API.ApiResponse>('/manage/admin/user/current-user', {
    method: 'GET',
    ...(options || {}),
  });
  
  return userResponse.result as API.CurrentUser;
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/manage/admin/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  let loginResult = await request<API.ApiResponse>('/manage/admin/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
  return loginResult.result as API.LoginResult;
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  let result =await request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  return result;
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
