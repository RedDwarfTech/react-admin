import { EntityList, ResponseHandler } from 'rdjs-wheel';
import request from 'umi-request';

export async function rolePage(
  params: {
    pageNum?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  let response = await request<API.ApiResponse>('/manage/permission/role/v1/page', {
    method: 'POST',
    body: JSON.stringify({
      ...params
    }),
    ...(options || {}),
  });
  let dataList: EntityList<API.RoleItem> = ResponseHandler.mapPageResponse<API.RoleItem>(response);
  return dataList;
}

export async function roleList() {
  let response = await request<API.ApiResponse>('/manage/permission/role/v1/list', {
    method: 'GET',
  });
  let dataList = response.result as API.RoleItem[];
  return dataList;
}

export async function saveRoleMenuPermission(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request('/manage/permission/role/v1/role/menu', {
    method: 'PUT',
    body: JSON.stringify(requestData),
  });
}

export async function addNewRole(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request('/manage/permission/role/v1/role/add', {
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