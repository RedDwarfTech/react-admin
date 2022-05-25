import { REST } from 'js-wheel/dist/src/model/rest/response/ApiResonse';
import ResponseHandler from 'js-wheel/dist/src/net/rest/ResponseHandler';
import request from 'umi-request';
import { history } from 'umi';

export async function tagPage(
    params: {
      pageNum?: number;
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/sys/tag/v1/page', {
      method: 'POST',
      body: JSON.stringify({
        ...params
      }),
      ...(options || {}),
    });
    let dataList: REST.EntityList<API.TagItem> = ResponseHandler.mapPageResponse<API.TagItem>(response);
    return dataList;
  }

export async function getUserRoles(params: any){
  let response = await request<API.ApiResponse>('/manage/permission/user/v1/roles?user_id=' + params.userId, {
    method: 'GET',
  });
  return response.result as API.UserRole[];
}

export async function saveUserRoles(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.ApiResponse>('/manage/permission/user/v1/save_roles', {
    method: 'PUT',
    body: JSON.stringify(requestData),
  });
}

export async function addNewUser(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.ApiResponse>('/manage/permission/user/v1/add', {
    method: 'PUT',
    body: JSON.stringify(requestData),
  });
}

export async function changePassword(options?: { [key: string]: any }) {
  let requestData = (options || {});
  let changePwdResult = request<API.ApiResponse>('/manage/permission/user/v1/pwd/edit', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
  if(ResponseHandler.responseSuccess(changePwdResult)){
    history.push("/user/login");
  }
}

export async function updateInterview(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.InterviewListItem>('/manage/app/job/interview/v1/update', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
}