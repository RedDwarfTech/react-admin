import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { menuPage, menuTree, userMenuTree } from '@/services/ant-design-pro/permission/menu/menu';

export interface IMenuState {
    data: API.InterviewList,
    menuTree: API.MenuItem[]
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
    }
    effects: {
        getMenuPage: Effect,
        getUserMenuList: Effect,
        getFullMenuTree: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}

const MenuModel: IMenuModel = {
    namespace: 'menus',
    state: {
        data: {},
        menuTree: []
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
                        data: data,
                        meta: {
                            ...params
                        }
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
