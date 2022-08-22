import { ResponseHandler, REST } from 'js-wheel';
import request from 'umi-request';

export async function channelPage(
    params: {
      // query
      /** 当前的页码 */
      pageNum?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/app/cruise/channel/v1/page', {
      method: 'GET',
      params: {
        ...params
      },
      ...(options || {}),
    });
    let dataList: REST.EntityList<API.ChannelListItem> = ResponseHandler.mapPageResponse<API.ChannelListItem>(response);
    return dataList;
  }

export async function pickChannel(options?: { [key: string]: any }){
  let requestData = (options || {});
  return request<API.ChannelListItem>('/manage/app/cruise/channel/v1/pick', {
    method: 'PUT',
    body: JSON.stringify(requestData),
  });
}

export async function updateChannel(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.InterviewListItem>('/manage/app/cruise/channel/v1/update', {
    method: 'PUT',
    body: JSON.stringify(requestData),
  });
}