import request from 'umi-request';

export async function articlePage(
    params: {
      // query
      /** 当前的页码 */
      pageNum?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/app/cruise/article/v1/page', {
      method: 'POST',
      params: {
        pageSize:params.pageSize,
        pageNum: params.current
      },
      body: JSON.stringify({
        ...params,
        pageNum: params.current
      }),
      ...(options || {}),
    });
    let dataList = convertPage(response) as API.InterviewList;
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