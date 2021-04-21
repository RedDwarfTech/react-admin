import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, BackTop, message } from 'antd'
import routes from '@/routes'
import { menuToggleAction } from '@/store/actionCreators'
import echarts from 'echarts/lib/echarts'
import avatar from '@/assets/images/user.jpg'
import menu from './menu'
import '@/style/layout.scss'
import AppHeader from './AppHeader.jsx'
import AppAside from './AppAside.jsx'
import AppFooter from './AppFooter.jsx'
import { getChannels } from '../actions/ChannelActions'
import { getUserListAction, removeUserAction } from '../actions/UserActions'
import { getArticles } from '../actions/ArticleActions'
import { getDashboardAction } from '../actions/DashboardActions'
import { getAppListAction } from '../actions/AppActions'
import { getTagAction } from '../actions/TagActions'

const { Content } = Layout

class DefaultLayout extends Component {
    state = {
        avatar,
        show: true,
        menu: []
    }

    isLogin = () => {
        if (!localStorage.getItem('user')) {
            this.props.history.push('/login')
        } else {
            this.setState({
                menu: this.getMenu(menu)
            })
        }
    }

    loginOut = () => {
        localStorage.clear()
        this.props.history.push('/login')
        message.success('登出成功!')
    }
    getMenu = menu => {
        let newMenu,
            auth = JSON.parse(localStorage.getItem('user')).auth
        if (!auth) {
            return menu
        } else {
            newMenu = menu.filter(res => res.auth && res.auth.indexOf(auth) !== -1)
            return newMenu
        }
    }

    componentDidMount() {
        this.isLogin()
    }

    componentDidUpdate() {
        let { pathname } = this.props.location

        // 菜单收缩展开时 echarts 图表的自适应
        if (pathname === '/' || pathname === '/index') {
            this.timer = setTimeout(() => {
                echarts.init(document.getElementById('bar')).resize()
                echarts.init(document.getElementById('line')).resize()
                echarts.init(document.getElementById('pie')).resize()
                echarts.init(document.getElementById('pictorialBar')).resize()
                echarts.init(document.getElementById('scatter')).resize()
            }, 500)
        } else {
            this.timer = null
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        let { menuClick, menuToggle } = this.props
        let { auth } = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : ''
        return (
            <Layout className='app'>
                <BackTop />
                <AppAside menuToggle={menuToggle} menu={this.state.menu} />
                <Layout style={{ marginLeft: menuToggle ? '80px' : '200px', minHeight: '100vh' }}>
                    <AppHeader
                        menuToggle={menuToggle}
                        menuClick={menuClick}
                        avatar={this.state.avatar}
                        show={this.state.show}
                        loginOut={this.loginOut}
                    />
                    <Content className='content'>
                        <Switch>
                            {routes.map(item => {
                                return (
                                    <Route
                                        key={item.path}
                                        path={item.path}
                                        exact={item.exact}
                                        render={props =>
                                            !auth ? (
                                                <item.component {...this.props} />
                                            ) : item.auth && item.auth.indexOf(auth) !== -1 ? (
                                                <item.component {...this.props} />
                                            ) : (
                                                // 这里也可以跳转到 403 页面
                                                <Redirect to='/404' {...props} />
                                            )
                                        }></Route>
                                )
                            })}
                            <Redirect to='/404' />
                        </Switch>
                    </Content>
                    <AppFooter />
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        menuToggle: state.menuToggle,
        channel: state.channel,
        user: state.user,
        article: state.article,
        dashboard: state.dashboard,
        app: state.app,
        tag: state.tag
    }
}

const dispatchToProp = dispatch => ({
    menuClick() {
        dispatch(menuToggleAction())
    },
    getChannels: name => {
        dispatch(getChannels(name))
    },
    getUserList: request => {
        dispatch(getUserListAction(request))
    },
    getArticleList: request => {
        dispatch(getArticles(request))
    },
    removeUser: request => {
        dispatch(removeUserAction(request))
    },
    getDashboard: request => {
        dispatch(getDashboardAction(request))
    },
    getApp: request => {
        dispatch(getAppListAction(request))
    },
    getTag: request => {
        dispatch(getTagAction(request))
    }
})

export default withRouter(connect(mapStateToProps, dispatchToProp)(DefaultLayout))
