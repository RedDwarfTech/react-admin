import loadable from '@/utils/loadable'

const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

// 通用
//const ButtonView = loadable(() => import(/* webpackChunkName: 'button' */ '@/views/PublicView/Button'))
//const IconView = loadable(() => import(/* webpackChunkName: 'icon' */ '@/views/PublicView/Icon'))

// 导航
//const DropdownView = loadable(() => import(/* webpackChunkName: 'dropdown' */ '@/views/NavView/Dropdown'))
//const MenuView = loadable(() => import(/* webpackChunkName: 'menu' */ '@/views/NavView/Menu'))
//const StepView = loadable(() => import(/* webpackChunkName: 'step' */ '@/views/NavView/Step'))

// 表单
//const FormBaseView = loadable(() => import(/* webpackChunkName: 'formBase' */ '@/views/FormView/FormBaseView'))
//const FormStepView = loadable(() => import(/* webpackChunkName: 'formStep' */ '@/views/FormView/FormStepView'))

// 展示
//const TableView = loadable(() => import(/* webpackChunkName: 'table' */ '@/views/ShowView/Table'))
//const CollapseView = loadable(() => import(/* webpackChunkName: 'collapse' */ '@/views/ShowView/Collapse'))
//const TreeView = loadable(() => import(/* webpackChunkName: 'tree' */ '@/views/ShowView/Tree'))
//const TabsView = loadable(() => import(/* webpackChunkName: 'tabs' */ '@/views/ShowView/Tabs'))

// 其它
//const ProgressView = loadable(() => import(/* webpackChunkName: 'progress' */ '@/views/Others/Progress'))
//const AnimationView = loadable(() => import(/* webpackChunkName: 'animation' */ '@/views/Others/Animation'))
//const EditorView = loadable(() => import(/* webpackChunkName: 'editor' */ '@/views/Others/Editor'))
//const UploadView = loadable(() => import(/* webpackChunkName: 'upload' */ '@/views/Others/Upload'))

//const Three = loadable(() => import(/* webpackChunkName: 'three' */ '@/views/TestView'))
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
    //{ path: '/public/button', exact: false, name: '按钮', component: ButtonView, auth: [1] },
    //{ path: '/public/icon', exact: false, name: '图标', component: IconView, auth: [1] },
    //{ path: '/nav/dropdown', exact: false, name: '下拉菜单', component: DropdownView },
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
