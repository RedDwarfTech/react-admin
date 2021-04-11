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
                        title: '用户', 
                        key: '/app/cruise/user', 
                        icon: 'user' 
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
                icon: '',
                subs: [{ title: '三级菜单', key: '/one/two/three', icon: '' }]
            }
        ]
    },
    {
        title: '关于',
        key: '/about',
        icon: 'user',
        auth: [1]
    }
]

export default menu
