import request from 'umi-request';

export async function menuPage(
    params: {
      /** 当前的页码 */
      pageNum?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/permission/menu/v1/page', {
      method: 'POST',
      body: JSON.stringify({
        ...params
      }),
      ...(options || {}),
    });
    let dataList = convertPage(response) as API.EntityList<API.MenuItem>;
    return dataList;
  }

  export async function userMenuTree() {
    let response = await request<API.ApiResponse>('/manage/permission/user/v1/menus', {
      method: 'GET'
    });
    let dataList = response.result;
    return dataList;
  }

  export async function roleMenuTree(
    params: {
      /** 当前的页码 */
      pageNum?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/permission/role/v1/role/menu', {
      method: 'POST',
      body: JSON.stringify({
        ...params
      }),
      ...(options || {}),
    });
    let dataList = response.result;
    return dataList;
  }
  
  export async function menuTree(
    params: {
      /** 当前的页码 */
      pageNum?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/permission/menu/v1/tree', {
      method: 'POST',
      body: JSON.stringify({
        ...params
      }),
      ...(options || {}),
    });
    let dataList = response.result as API.EntityList<API.MenuItem>;
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