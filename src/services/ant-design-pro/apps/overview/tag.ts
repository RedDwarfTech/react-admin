import { REST } from 'js-wheel/dist/src/model/rest/response/ApiResonse';
import ResponseHandler from 'js-wheel/dist/src/net/rest/ResponseHandler';
import request from 'umi-request';

export async function tagPage(
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

export async function getTagsList(params: any){
  let response = await request<API.ApiResponse>('/manage/app/tags/v1/list', {
    method: 'POST',
    body: JSON.stringify(params)
  });
  return response.result as API.UserRole[];
}
