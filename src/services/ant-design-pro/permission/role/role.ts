import request from 'umi-request';
import {ResponseHandler} from 'js-wheel/dist/src/net/rest/ResponseHandler';
import {REST} from 'js-wheel/dist/src/model/rest/response/ApiResonse';

export async function rolePage(
    params: {
      pageNum?: number;
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/permission/role/v1/page', {
      method: 'POST',
      body: JSON.stringify({
        ...params
      }),
      ...(options || {}),
    });
    let dataList: REST.EntityList<API.RoleItem> = ResponseHandler.mapPageResponse<API.RoleItem>(response);
    return dataList;
  }

export async function saveRoleMenuPermission(options?: { [key: string]: any }){
  let requestData = (options || {});
  return request('/manage/permission/role/v1/role/menu', {
    method: 'PUT',
    body: JSON.stringify(requestData),
  });
}

export async function updateInterview(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.InterviewListItem>('/manage/app/job/interview/v1/update', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
}