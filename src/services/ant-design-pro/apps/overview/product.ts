import { EntityList, ResponseHandler } from 'rdjs-wheel';
import request from 'umi-request';

export async function productPage(
    params: {
      pageNum?: number;
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/app/overview/product/v1/page', {
      method: 'POST',
      body: JSON.stringify({
        ...params,
        pageNum: params.current
      }),
      ...(options || {}),
    });
    let dataList: EntityList<API.ProductList> = ResponseHandler.mapPageResponse<API.ProductList>(response);
    return dataList;
}

export async function getProductList(options?: { [key: string]: any }) {
  let result =  await request<API.ApiResponse>('/manage/app/overview/product/v1/list', {
    method: 'GET'
  });
  return result.result;
}

export async function addProduct(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.ProductListItem>('/manage/app/overview/product/v1/add', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
}

export async function editProductImpl(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.ProductListItem>('/manage/app/overview/product/v1/edit', {
    method: 'PATCH',
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