import { Effect, Reducer, Subscription } from 'umi';
import { rolePage } from '@/services/ant-design-pro/permission/role/role';
import { menuPage } from '@/services/ant-design-pro/permission/menu/menu';

export interface IRoleState {
    data: API.InterviewList,
    menus: API.MenuItem,
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
        getTree: Reducer<IRoleState>
    }
    effects: {
        getRolePage: Effect,
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
        menus: {},
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
                        menus: data.data
                    }
                })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }, done) {
            return history.listen((location, action) => {
                if(location.pathname === '/users' || location.pathname === '/my') {
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
