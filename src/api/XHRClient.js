import axios from 'axios'
import store from '../store/index'
import { message } from 'antd'
import { removeUserAction } from '../actions/UserActions'

const instance = axios.create({
    timeout: 5000
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

instance.interceptors.request.use(
    config => {
        // 将 token 添加到请求头
        const token = localStorage.getItem('token')
        token && (config.headers.token = token)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.status === 200 && response.data.statusCode === '200' && response.data.resultCode === '200') {
            return Promise.resolve(response)
        } else if (response.data.statusCode === '907') {
            //console.warn('登录失效，导航到登录页面')
            //store.dispatch(removeUserAction(""))
            //window.location.href = '/#/login'
        } else if (response.data.statusCode === '904') {
            //console.warn('登录失效，导航到登录页面')
            //登录已失效
            //store.dispatch(removeUserAction(""))
            //window.location.href = '/#/login'
        } else {
            let errorMessage = response.data.msg
            message.error(errorMessage)
            return Promise.reject(response)
        }
    },
    error => {
        // 相应错误处理
        // 比如： token 过期， 无权限访问， 路径不存在， 服务器问题等
        switch (error.response.status) {
            case 401:
                break
            case 403:
                break
            case 404:
                break
            case 500:
                break
            default:
                console.log('其他错误信息')
        }
        return Promise.reject(error)
    }
)

export function requestWithAction(config, action) {
    return instance(config)
        .then(response => {
            if (response) {
                const data =
                    response.data.result == null || Object.keys(response.data.result).length === 0
                        ? {}
                        : response.data.result
                store.dispatch(action(data))
            }
        })
        .catch(error => {
            console.error(error)
        })
}
