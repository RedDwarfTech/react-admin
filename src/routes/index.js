import loadable from '@/utils/loadable'

const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

const About = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/About'))

// Cruise App
const Channel = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Cruise/Channel'))

const User = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Overview/User'))
const App = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Overview/App'))
const Tag = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Overview/Tag'))

// Cruise
const Article = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Cruise/Article'))
const ArticleDetail = loadable(() =>
    import(/* webpackChunkName: 'about' */ '@/views/App/Cruise/Article/ArticleDetail/ArticleDetail')
)

const Product = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Cruise/Product/Product'))

// Acientbay
const Collection = loadable(() => import('@/views/App/AcientBay/Collection/Collection'))

// Cernitor
const Domain = loadable(() => import('@/views/App/Cernitor/Domain'))

// 长歌
const FavMusic = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/App/Music/Fav/FavMusic'))

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
        path: '/app/cruise/product',
        exact: false,
        name: '商品',
        component: Product
    },
    // Acientbay
    {
        path: '/app/acientbay/collection',
        exact: false,
        name: '作品管理',
        component: Collection
    },
    // Cernitor
    {
        path: '/app/cernitor/domain',
        exact: false,
        name: '作品管理',
        component: Domain
    },
    // 长歌
    {
        path: '/app/music/fav',
        exact: false,
        name: '收藏',
        component: FavMusic
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
