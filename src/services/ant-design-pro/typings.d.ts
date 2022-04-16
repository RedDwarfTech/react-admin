// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Dictionary = {
    key,
    value,
    show_value,
    dict_type,
  };

  type DictionaryList = {
    list?: Dictionary[];
  };

  type CurrentUser = {
    nickname?: string;
    avatarUrl?: string;
    userId?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
    hasRoutes: []
  };

  type LoginResult = {
    status?: string;
    type?: string;
    accessToken: string;
    currentAuthority?: string;
  };

  type ApiResponse = {
    result:any,
    msg?: string,
    resultCode: string,
    statusCode: string
  };

  type PageParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type ProductListItem = {
    id: number;
    product_name: string;
  };

  type ProductList = {
    data?: ProductListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type AppListItem = {
    id: number;
    app_name: string;
  };

  type AppList = {
    data?: AppListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type ChannelListItem = {
    id: number;
    company: string;
    address: string;
    city: string;
    status: number;
    interview_time: number;
    job_link: String,
    salary_range: String
  };

  /** artcile **/

  type ArticleList = {
    data?: ArticleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type ArticleListItem = {
    id: number;
    content: string;
  };

  type InterviewListItem = {
    id: number;
    company: string;
    address: string;
    city: string;
    status: number;
    interview_time: number;
    job_link: String,
    salary_range: String
  };

  type EntityList<T> = {
    data?: T[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }

  type InterviewList = {
    data?: InterviewListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RoleItem = {
    id: number;
    name: string;
  };

  type AdminUserItem = {
    id: number;
    name: string;
  };

  type MenuItem = {
    id: number;
    name: string;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    phone?: string;
    password?: string;
    autoLogin?: boolean;
    deviceId?:string;
    app?:number;
    loginType: number;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
