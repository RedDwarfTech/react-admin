import { EntityList, ResponseHandler } from 'rdjs-wheel';
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
    let dataList: EntityList<API.MenuItem> = ResponseHandler.mapPageResponse<API.MenuItem>(response);
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

  export async function add(params:any){
    let response = await request<API.ApiResponse>('/manage/permission/menu/v1/menu/add', {
      method: 'PUT',
      body: JSON.stringify({
        ...params
      }),
    });
    return response;
  }

  export async function update(params:any) : Promise<API.ApiResponse>{
    let response = await request<API.ApiResponse>('/manage/permission/menu/v1/menu/edit', {
      method: 'PATCH',
      body: JSON.stringify({
        ...params
      }),
    });
    return await response;
  }