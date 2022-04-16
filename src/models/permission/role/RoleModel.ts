import { Effect, Reducer, Subscription } from 'umi';
import { pickChannel } from '@/services/ant-design-pro/apps/cruise/channel/channel';
import { rolePage } from '@/services/ant-design-pro/permission/role/role';
import { menuPage } from '@/services/ant-design-pro/permission/menu/menu';

export interface IRoleState {
    data: API.InterviewList,
    meta: {
        total: number
        per_page: number
        page: number
    }
}

interface IRoleModel {
    namespace: 'roles'
    state: IRoleState
    reducers: {
        getPage: Reducer<IRoleState>,
        pickChannel: Reducer<IRoleState>,
        getTree: Reducer<IRoleState>
    }
    effects: {
        getRolePage: Effect,
        editorPickChannel: Effect,
        getMenuTree: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}


const RoleModel: IRoleModel = {
    namespace: 'roles',
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
        },
        getTree(state, action){
            return action.payload
        },
    },
    effects: {
        *getRolePage({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(rolePage,  params)
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
        *getMenuTree({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(menuPage,  params)
            if (data) {
                yield effects.put({
                    type: 'getTree',
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
export default RoleModel;
