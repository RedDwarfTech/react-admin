import { Effect, Reducer, Subscription } from 'umi';
import { pickChannel } from '@/services/ant-design-pro/apps/cruise/channel/channel';
import { menuPage, userMenuTree } from '@/services/ant-design-pro/permission/menu/menu';

export interface IMenuState {
    data: API.InterviewList,
    meta: {
        total: number
        per_page: number
        page: number
    }
}

interface IMenuModel {
    namespace: 'menus'
    state: IMenuState
    reducers: {
        getPage: Reducer<IMenuState>,
        getUserMenus: Reducer<IMenuState>
    }
    effects: {
        getMenuPage: Effect,
        getUserMenuList: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}


const MenuModel: IMenuModel = {
    namespace: 'menus',
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
        getUserMenus(state, action){
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
