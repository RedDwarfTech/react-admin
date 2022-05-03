import { ResponseHandler, REST } from 'js-wheel';
import request from 'umi-request';

export async function orgPage(
    params: {
      pageNum?: number;
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/permission/org/v1/page', {
      method: 'POST',
      body: JSON.stringify({
        ...params
      }),
      ...(options || {}),
    });
    let dataList: REST.EntityList<API.OrgItem> = ResponseHandler.mapPageResponse<API.OrgItem>(response);
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
      pageNum?: number;
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
    let dataList = response.result as API.MenuItem[];
    return dataList;
  }
  
  export async function orgTree(
    params: {
      /** 当前的页码 */
      pageNum?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/permission/org/v1/tree', {
      method: 'POST',
      body: JSON.stringify({
        ...params
      }),
      ...(options || {}),
    });
    let dataList = response.result as API.EntityList<API.MenuItem>;
    return dataList;
  }

  export async function add(params:any){
    let response = await request<API.ApiResponse>('/manage/permission/menu/v1/menu/add', {
      method: 'PUT',
      body: JSON.stringify({
        ...params
      }),
    });
    return response;
  }