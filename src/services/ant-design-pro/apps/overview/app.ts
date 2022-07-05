import { ResponseHandler, REST } from 'js-wheel';
import request from 'umi-request';

export async function appPage(
    params: {
      pageNum?: number;
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/app/overview/app/v1/page', {
      method: 'POST',
      body: JSON.stringify({
        ...params,
        pageNum: params.current
      }),
      ...(options || {}),
    });
    let dataList: REST.EntityList<API.AppListItem> = ResponseHandler.mapPageResponse<API.AppListItem>(response);
    return dataList;
}
  
export async function addApp(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.InterviewListItem>('/manage/app/overview/app/v1/add', {
    method: 'POST',
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