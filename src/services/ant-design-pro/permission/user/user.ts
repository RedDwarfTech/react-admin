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
  

  function convertPage(response:API.ApiResponse){
    let tableSource = {
      data: response.result.list,
      pageSize: response.result.pagination.pageSize,
      current: response.result.pagination.pageNum,
      success: true,
      total: response.result.pagination.total
    };
    return tableSource;
  }

export async function pickChannel(options?: { [key: string]: any }){
  let requestData = (options || {});
  return request<API.ChannelListItem>('/manage/app/cruise/channel/v1/pick', {
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