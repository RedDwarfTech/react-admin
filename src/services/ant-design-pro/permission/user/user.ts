import { REST } from 'js-wheel/dist/src/model/rest/response/ApiResonse';
import ResponseHandler from 'js-wheel/dist/src/net/rest/ResponseHandler';
import request from 'umi-request';

export async function userPage(
    params: {
      pageNum?: number;
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/permission/user/v1/page', {
      method: 'POST',
      body: JSON.stringify({
        ...params
      }),
      ...(options || {}),
    });
    let dataList: REST.EntityList<API.AdminUserItem> = ResponseHandler.mapPageResponse<API.AdminUserItem>(response);
    return dataList;
  }

export async function getUserRoles(){
  let response = await request<API.ApiResponse>('/manage/permission/user/v1/roles', {
    method: 'GET',
  });
  return response.result as API.UserRole[];
}

export async function updateInterview(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.InterviewListItem>('/manage/app/job/interview/v1/update', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
}