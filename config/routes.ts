export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/app',
    name: 'app',
    icon: 'crown',
    //access: 'canAdmin',
    routes: [
      {
        path: '/app/overview',
        name: 'overview',
        icon: 'smile',
        routes: [
          {
            path: '/app/overview/product',
            name: 'product',
            icon: 'smile',
            component: './apps/overview/product',
          },
          {
            path: '/app/overview/list',
            name: 'list',
            icon: 'smile',
            component: './apps/overview/app',
          },
          /**{
            path: '/app/overview/tag',
            name: 'tag',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/app/overview/user',
            name: 'user',
            icon: 'smile',
            component: './Welcome',
          },**/
        ]
      },
      {
        path: '/app/cruise',
        name: 'cruise',
        icon: 'smile',
        routes: [
          {
            path: '/app/cruise/channel',
            name: 'channel',
            icon: 'smile',
            component: './apps/cruise/channel',
          },
          {
            path: '/app/cruise/article',
            name: 'article',
            icon: 'smile',
            component: './apps/cruise/article',
          },
          {
            path: '/app/cruise/article/detail',
            name: 'articleDetail',
            icon: 'smile',
            hideInMenu: true,
            component: './apps/cruise/article/detail/ArticleDetail',
          }
        ]
      },
      {
        path: '/app/job',
        name: 'job',
        icon: 'crown',
        //component: './Welcome',
        routes: [
          {
            path: '/app/job/interview',
            name: 'interview',
            component: './apps/jobs/Interview',
          },
        ]
      },
    ]
  },
  {
    path: '/appbind',
    name: 'appbind',
    icon: 'crown',
    routes: [
      {
        path: '/appbind/list',
        name: 'bindlist',
        icon: 'smile',
        component: './bind/BindList',
      }
    ]
  }, 
  {
    path: '/privilege',
    name: 'privilege',
    icon: 'crown',
    routes: [
      {
        path: '/privilege/role',
        name: 'role',
        icon: 'smile',
        component: './permission/role',
      },
      {
        path: '/privilege/user',
        name: 'user',
        icon: 'smile',
        component: './permission/user',
      },
      {
        path: '/privilege/menu',
        name: 'menu',
        icon: 'smile',
        component: './permission/menu',
      }
    ]
  },
  {
    path: '/me',
    name: 'me',
    icon: 'crown',
    routes: [
      {
        path: '/me/password',
        name: 'password',
        icon: 'smile',
        component: './me/password',
      }
    ]
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
