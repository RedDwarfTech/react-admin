import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import loadable from './utils/loadable'
import 'animate.css'
import './style/base.scss'
import './style/App.scss'
import {login} from './actions/UserActions'

// 公共模块
const DefaultLayout = loadable(() => import(/* webpackChunkName: 'default' */ './containers'))

// 基础页面
const View404 = loadable(() => import(/* webpackChunkName: '404' */ './views/Others/404'))
const View500 = loadable(() => import(/* webpackChunkName: '500' */ './views/Others/500'))
const Login = loadable(() => import(/* webpackChunkName: 'login' */ './views/Login'))

class App extends React.Component {
    render() {
        return (<div>dddddddddddddddcddddddddd</div>)
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {
            dispatch(login(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
