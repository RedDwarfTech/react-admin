const menu = [
    {
        key: '/index',
        title: '首页',
        icon: 'home',
        auth: [1]
    },
    {
        title: '应用',
        key: '/app',
        icon: 'bars',
        subs: [
            {
                title: '全局',
                key: '/app/overview',
                icon: 'bars', 
                subs: [
                    { 
                        title: '应用', 
                        key: '/app/overview/app', 
                        icon: '',
                        icon: 'bars' 
                    },
                    { 
                        title: '标签', 
                        key: '/app/overview/tag', 
                        icon: '',
                        icon: 'bars' 
                    },
                    {
                        title: '用户', 
                        key: '/app/overview/user', 
                        icon: 'user' 
                    },
                ]
            },
            {
                title: 'Cruise',
                key: '/app/cruise',
                icon: 'bars',
                subs: [
                    { 
                        title: '频道', 
                        key: '/app/cruise/channel', 
                        icon: 'bars' 
                    },
                    {
                        title: '文章', 
                        key: '/app/cruise/article', 
                        icon: 'bars' 
                    }
                ]
            },
            {
                title: 'AcientBay',
                key: '/app/two',
                icon: 'bars',
                subs: [{ title: '开发中', key: '/one/two/three', icon: '' }]
            }
        ]
    },
    {
        title: '关于',
        key: '/about',
        icon: 'bars',
        auth: [1]
    }
]

export default menu
