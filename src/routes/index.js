import loadable from '@/utils/loadable'

const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

const About = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/About'))

// Cruise App
const Channel = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Cruise/Channel'))

const User = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Overview/User'))
const App = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Overview/App'))
const Tag = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Overview/Tag'))

const Article = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Cruise/Article'))
const ArticleDetail = loadable(() =>
    import(/* webpackChunkName: 'about' */ '@/views/App/Cruise/Article/ArticleDetail/ArticleDetail')
)

const Password = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/Profile/Password'))

const routes = [
    { path: '/index', exact: true, name: 'Index', component: Index, auth: [1] },
    {
        path: '/app/overview/app',
        exact: false,
        name: '应用列表',
        component: App
    },
    {
        path: '/app/overview/tag',
        exact: false,
        name: '标签列表',
        component: Tag
    },
    {
        path: '/app/cruise/channel',
        exact: false,
        name: '频道列表',
        component: Channel
    },
    {
        path: '/app/overview/user',
        exact: false,
        name: '用户列表',
        component: User
    },
    {
        path: '/app/cruise/article',
        exact: true,
        name: '文章列表',
        component: Article
    },
    {
        path: '/app/cruise/article/detail/:id',
        exact: false,
        name: '文章详情',
        component: ArticleDetail
    },
    {
        path: '/profile/password',
        exact: false,
        name: '修改密码',
        component: Password
    },
    { path: '/about', exact: false, name: '关于', component: About, auth: [1] }
]

export default routes
