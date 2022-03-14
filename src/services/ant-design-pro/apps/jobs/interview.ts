import request from 'umi-request';

export async function interviewPage(
    params: {
      // query
      /** 当前的页码 */
      pageNum?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/app/job/interview/v1/page', {
      method: 'POST',
      params: {
        pageSize:params.pageSize,
        pageNum: params.current
      },
      body: JSON.stringify({
        pageSize:params.pageSize,
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

/** 新建面试 POST /api/rule */
export async function addInterview(options?: { [key: string]: any }) {
  let requestData = (options || {});
  debugger
  return request<API.InterviewListItem>('/manage/app/job/interview/v1/add', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
}