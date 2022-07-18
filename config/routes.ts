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
    path: '/apps',
    name: 'app',
    icon: 'crown',
    //access: 'canAdmin',
    routes: [
      {
        path: '/apps/overview',
        name: 'overview',
        icon: 'smile',
        routes: [
          {
            path: '/apps/overview/product',
            name: 'product',
            icon: 'smile',
            component: './apps/overview/product',
          },
          {
            path: '/apps/overview/app',
            name: 'list',
            icon: 'smile',
            component: './apps/overview/app',
          },
        ]
      },
      {
        path: '/apps/cruise',
        name: 'cruise',
        icon: 'smile',
        routes: [
          {
            path: '/apps/cruise/overview',
            name: 'overview',
            icon: 'smile',
            component: './apps/cruise/overview',
          },
          {
            path: '/apps/cruise/channel',
            name: 'channel',
            icon: 'smile',
            component: './apps/cruise/channel',
          },
          {
            path: '/apps/cruise/article',
            name: 'article',
            icon: 'smile',
            component: './apps/cruise/article',
          },
          {
            path: '/apps/cruise/article/detail',
            name: 'articleDetail',
            icon: 'smile',
            hideInMenu: true,
            component: './apps/cruise/article/detail/ArticleDetail',
          }
        ]
      },
      {
        path: '/apps/music',
        name: 'music',
        icon: 'smile',
        routes: [
          {
            path: '/apps/music/playlist',
            name: 'playlist',
            icon: 'smile',
            component: './apps/music/playlist',
          },
          {
            path: '/apps/music/music',
            name: 'music',
            icon: 'smile',
            component: './apps/music/music',
          }
        ]
      },
      {
        path: '/apps/dict',
        name: 'dict',
        icon: 'smile',
        routes: [
          
        ]
      },
      {
        path: '/apps/job',
        name: 'job',
        icon: 'crown',
        //component: './Welcome',
        routes: [
          {
            path: '/apps/jobs/interview',
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
      },
      {
        path: '/privilege/org',
        name: 'org',
        icon: 'smile',
        component: './permission/org',
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
    path: '/system',
    name: 'system',
    icon: 'crown',
    routes: [
      {
        path: '/system/dict',
        name: 'dict',
        icon: 'smile',
        component: './system/dict',
      },
      {
        path: '/system/tag',
        name: 'tag',
        icon: 'smile',
        component: './system/tag',
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
