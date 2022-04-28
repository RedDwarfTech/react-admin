import { ResponseHandler, REST } from 'js-wheel';
import request from 'umi-request';

export async function articlePage(params: any) {
    let response = await request<API.ApiResponse>('/manage/app/cruise/article/v1/page', {
      method: 'POST',
      body: JSON.stringify({
        ...params,
      }),
    });
    let dataList: REST.EntityList<API.ArticleListItem> = ResponseHandler.mapPageResponse<API.ArticleListItem>(response);
    return dataList;
}
  
export async function articleDetail(id: number) {
  let response:API.ApiResponse = await request<API.ApiResponse>('/manage/app/cruise/article/v1/detail/'+id , {
    method: 'GET',
  });
  return response.result as API.ArticleListItem;
}

export async function updateInterview(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.InterviewListItem>('/manage/app/job/interview/v1/update', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
}