import request from 'umi-request';

/** 获取规则列表 GET /api/rule */
export async function interviewPage(
    params: {
      // query
      /** 当前的页码 */
      current?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    debugger
    return request<API.RuleList>('/api/rule', {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }
  

