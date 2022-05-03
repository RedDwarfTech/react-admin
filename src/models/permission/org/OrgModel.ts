import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { add, menuTree, userMenuTree } from '@/services/ant-design-pro/permission/menu/menu';
import { REST } from 'js-wheel';
import { orgPage } from '@/services/ant-design-pro/permission/org/org';

export interface IOrgState {
    data: API.OrgItem[],
    menuTree: API.OrgItem[],
    pagination: REST.Pagination
}

export interface IOrgProps {
    orgs: IOrgState, 
    dispatch: Dispatch
    loading: boolean
}

interface IOrgModel {
    namespace: 'orgs'
    state: IOrgState
    reducers: {
        getPage: Reducer<IOrgState>,
        getUserMenus: Reducer<IOrgState>,
        getTree:Reducer<IOrgState>,
        add: Reducer<IOrgState>,
    }
    effects: {
        getOrgPage: Effect,
        getUserMenuList: Effect,
        getFullMenuTree: Effect,
        addMenu: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}

const OrgModel: IOrgModel = {
    namespace: 'orgs',
    state: {
        data: [],
        menuTree: [],
        pagination: {} as API.Pagination,
    },
    reducers: {
        getPage(state, action) {
            return action.payload
        },
        getUserMenus(state, action){
            return action.payload
        },
        getTree(state, action){
            action.payload = {
                ...state,
                menuTree: action.payload.menuTree
            };
            return action.payload
        },
        add(state, action){
            action.payload = {
                ...state,
                menuTree: action.payload.menuTree
            };
            return action.payload
        }
    },
    effects: {
        *getOrgPage({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(orgPage,  params)
            if (data) {
                yield effects.put({
                    type: 'getPage',
                    payload: {
                        data: data.data,
                        pagination: data.pagination
                    }
                })
            }
        },
        *getUserMenuList({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(userMenuTree,  params)
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
        },
        *getFullMenuTree({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(menuTree,  params)
            if (data) {
                yield effects.put({
                    type: 'getTree',
                    payload: {
                        menuTree: data,
                    }
                })
            }
        },
        *addMenu({payload: params}, effects){
            debugger
            if(!params) return;            
            const data = yield effects.call(add,  params)
            if (data) {
                yield effects.put({
                    type: 'getTree',
                    payload: {
                        menuTree: data,
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
export default OrgModel;
