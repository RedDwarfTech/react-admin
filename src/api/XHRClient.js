import axios from 'axios';
import store from "../store/index";

const token = localStorage.getItem('token')

const instance = axios.create({
    timeout: 5000
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

instance.interceptors.request.use(
    config => {
        console.log("请求拦截");
        // 将 token 添加到请求头
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
        if (response.status === 200 && response.data.statusCode === '200') {
            return Promise.resolve(response)
        } else if(response.data.statusCode === '907'){
            window.location.href = '/#/login'
        } else if(response.data.statusCode === '904'){
            //登录已失效
            window.location.href = '/#/login'
        }else {
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

export function request(config) {
    return instance(config).then(
        response => {
            console.log("Axios请求服务端返回结果是：", response.data.data);
            const book = response.data.data;
            //store.dispatch(searchBookById(book));
        }
    ).catch(
        error => {
            console.error(error);
        }
    );
}

export function requestWithAction(config, action) {
    return instance(config).then(
        response => {
            console.log("Axios请求服务端返回结果是：", response.data);
            const data = response.data.result;
            store.dispatch(action(data));
        }
    ).catch(
        error => {
            console.error(error);
        }
    );
}
