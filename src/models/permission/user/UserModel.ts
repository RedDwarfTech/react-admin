import { Effect, Reducer, Subscription } from 'umi';
import { pickChannel } from '@/services/ant-design-pro/apps/cruise/channel/channel';
import { userPage } from '@/services/ant-design-pro/permission/user/user';

export interface IUserState {
    data: API.AdminUserItem,
    meta: {
        total: number
        per_page: number
        page: number
    }
}

interface IUserModel {
    namespace: 'users'
    state: IUserState
    reducers: {
        getPage: Reducer<IUserState>,
        pickChannel: Reducer<IUserState>
    }
    effects: {
        getUserPage: Effect,
        editorPickChannel: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}


const UserModel: IUserModel = {
    namespace: 'users',
    state: {
        data: {},
        meta: {
            current: 1,
            pageSize: 10,
            page: 1
        }
    },
    reducers: {
        getPage(state, action) {
            return action.payload
        },
        pickChannel(state, action){
            return action.payload
        }
    },
    effects: {
        *getUserPage({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(userPage,  params)
            if (data) {
                yield effects.put({
                    type: 'getPage',
                    payload: {
                        data: data,
                        meta: {
                            ...params
                        }
                    }
                })
            }
        },
        *editorPickChannel({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(pickChannel,  params)
            if (data) {
                yield effects.put({
                    type: 'pickChannel',
                    payload: {
                        data: data,
                        meta: {
                            ...params
                        }
                    }
                })
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }, done) {
            return history.listen((location, action) => {
                if(location.pathname === '/users' || location.pathname === '/my') {
                    // 监听路由的改变，当路由为 '/users' 时，发送 action 获取数据，返回到页面。
                    dispatch({
                        type: 'getRemove',
                        payload: {
                            page: 1,
                            per_page: 5
                        }
                    })
                }
            })
        }
    }
};
export default UserModel;
