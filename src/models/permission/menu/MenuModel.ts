import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { add, menuPage, menuTree, update, userMenuTree } from '@/services/ant-design-pro/permission/menu/menu';
import { REST } from 'js-wheel';

export interface IMenuState {
    data: API.MenuItem[],
    menuTree: API.MenuItem[],
    pagination: REST.Pagination
}

export interface MenuProps {
    menus: IMenuState, 
    dispatch: Dispatch
    loading: boolean
}

interface IMenuModel {
    namespace: 'menus'
    state: IMenuState
    reducers: {
        getPage: Reducer<IMenuState>,
        getUserMenus: Reducer<IMenuState>,
        getTree:Reducer<IMenuState>,
        add: Reducer<IMenuState>,
        update: Reducer<IMenuState>,
    }
    effects: {
        getMenuPage: Effect,
        getUserMenuList: Effect,
        getFullMenuTree: Effect,
        addMenu: Effect,
        updateMenu: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}

const MenuModel: IMenuModel = {
    namespace: 'menus',
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
        },
        update(state, action){
            action.payload = {
                ...state
            };
            return action.payload
        }
    },
    effects: {
        *getMenuPage({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(menuPage,  params)
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
        },
        *updateMenu({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(update,  params)
            if (data) {
                yield effects.put({
                    type: 'update',
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
export default MenuModel;
