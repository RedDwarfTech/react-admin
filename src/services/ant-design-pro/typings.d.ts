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

  type Pagination = {
    total: number
    per_page: number
    page: number
  };

  type PageParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type ProductListItem = {
    id: number;
    product_name: string;
    product_attr: string;
    remark: string;
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
    remark: string;
    app_abbr: string;
    product_id: number;
  };

  type AppList = {
    data?: AppListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type UserRole = {
    user_id: number;
    role_id: number;
  };

  type ChannelListItem = {
    sub_name: string;
    id: number;
    city: string;
    status: number;
    sub_status: number;
    comment_rss: number;
    part_output: number;
    interview_time: number;
    created_time: number;
    job_link: String,
    sub_url: String,
    salary_range: String,
    tags: TagItem[],
    article_count: number,
    fav_icon_url: string
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
    title: string;
    created_time: number;
    channel_name: string;
    pub_time: string;
    sub_url: string;
    link: string;
  };

  type TrendListItem = {
    id: number;
    created_time: number;
    statistic_time: number;
    incre_num: number;
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
    pagination: Pagination;
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
    remark: string;
  };

  type AdminUserItem = {
    id: number;
    name: string;
  };

  type DictItem = {
    id: number;
    name: string;
  };

  type TagItem = {
    id: number;
    name: string;
    tag_name: string;
    code: string;
  };
  
  type MenuItem = {
    id: number;
    name: string;
    path: string;
    tree_id_path: string;
    component: string;
    sort: number;
    icon: string;
    children: MenuItem[];
    routes: MenuItem[];
  };

  type OrgItem = {
    id: number;
    name: string;
    path: string;
    tree_id_path: string;
    children: MenuItem[];
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
