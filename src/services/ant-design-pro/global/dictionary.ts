import request from 'umi-request';

export async function sysDictionary(options?: { [key: string]: any }) {
    let response = await request<API.ApiResponse>('/manage/sys/dict/v1/list', {
      method: 'GET',
      ...(options || {}),
    });
    
    return response.result as API.Dictionary[];
}

export async function sysOrgs(options?: { [key: string]: any }) {
  let response = await request<API.ApiResponse>('/manage/permission/org/v1/org/list', {
    method: 'GET',
    ...(options || {}),
  });
  return response.result as API.OrgItem[];
}