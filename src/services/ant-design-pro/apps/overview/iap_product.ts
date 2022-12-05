import { ResponseHandler, REST } from 'js-wheel';
import request from 'umi-request';

export async function iapProductPage(
    params: {
      pageNum?: number;
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    let response = await request<API.ApiResponse>('/manage/app/overview/iapproduct/v1/page', {
      method: 'POST',
      body: JSON.stringify({
        ...params,
        pageNum: params.current
      }),
      ...(options || {}),
    });
    let dataList: REST.EntityList<API.IapProductList> = ResponseHandler.mapPageResponse<API.IapProductList>(response);
    return dataList;
}

export async function getIapProductList(options?: { [key: string]: any }) {
  let result =  await request<API.ApiResponse>('/manage/app/overview/product/v1/list', {
    method: 'GET'
  });
  return result.result;
}

export async function addIapProduct(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.ProductListItem>('/manage/app/overview/product/v1/add', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
}

export async function editIapProductImpl(options?: { [key: string]: any }) {
  let requestData = (options || {});
  return request<API.ProductListItem>('/manage/app/overview/product/v1/edit', {
    method: 'PATCH',
    body: JSON.stringify(requestData),
  });
}
