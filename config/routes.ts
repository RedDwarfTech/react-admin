export default [
  {
    path: '/privilege',
    name: 'privilege',
    icon: 'crown',
    component: './Welcome',
    routes: [
      {
        path: '/privilege/role',
        name: 'role',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/privilege/user',
        name: 'user',
        icon: 'smile',
        component: './Welcome',
      }
    ]
  },
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
    component: './Welcome',
    routes: [
      {
        path: '/app/overview',
        name: 'overview',
        icon: 'smile',
        component: './Welcome',
        routes: [
          {
            path: '/app/overview/list',
            name: 'list',
            icon: 'smile',
            component: './Welcome',
          },
          {
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
          },
        ]
      },
      {
        path: '/app/cruise',
        name: 'cruise',
        icon: 'smile',
        component: './Welcome',
        routes: [
          {
            path: '/app/cruise/channel',
            name: 'channel',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/app/cruise/article',
            name: 'article',
            icon: 'smile',
            component: './Welcome',
          }
        ]
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    //access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
