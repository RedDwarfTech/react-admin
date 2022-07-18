import request from 'umi-request';

export async function trendList(params: any) {
    let response = await request<API.ApiResponse>('/manage/app/cruise/overview/v1/list', {
      method: 'POST',
      body: JSON.stringify({
        ...params,
      }),
    });
    let dataList = response.result;
    return dataList;
}
