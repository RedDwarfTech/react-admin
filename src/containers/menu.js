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
                        icon: 'bars'
                    },
                    {
                        title: '标签',
                        key: '/app/overview/tag',
                        icon: 'bars'
                    },
                    {
                        title: '用户',
                        key: '/app/overview/user',
                        icon: 'user'
                    }
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
                    },
                    {
                        title: '商品',
                        key: '/app/cruise/product',
                        icon: 'bars'
                    }
                ]
            },
            {
                title: 'AcientBay',
                key: '/app/acientbay',
                icon: 'bars',
                subs: [
                    {
                        title: '作品管理',
                        key: '/app/acientbay/collection',
                        icon: ''
                    },
                    {
                        title: '开发中',
                        key: '/one/two/three',
                        icon: ''
                    }
                ]
            },
            {
                title: '长歌',
                key: '/app/music',
                icon: 'bars',
                subs: [
                    {
                        title: '收藏音乐',
                        key: '/app/music/fav',
                        icon: ''
                    }
                ]
            }
        ]
    },
    {
        title: '个人设置',
        key: '/profile',
        icon: 'bars',
        auth: [1],
        subs: [
            {
                title: '修改密码',
                key: '/profile/password',
                icon: 'bars'
            }
        ]
    },
    {
        title: '系统设置',
        key: '/system',
        icon: 'bars',
        auth: [1],
        subs: [
            {
                title: '主题',
                key: '/profile/password1',
                icon: 'bars'
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
