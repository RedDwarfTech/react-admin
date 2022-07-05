import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { menuTree } from '@/services/ant-design-pro/permission/menu/menu';
import { REST } from 'js-wheel';
import { addProduct, getProductList } from '@/services/ant-design-pro/apps/overview/product';
import { addApp, appPage, editApp } from '@/services/ant-design-pro/apps/overview/app';
import BaseMethods from 'js-wheel/dist/src/utils/data/BaseMethods';

export interface IAppState {
    data: API.AppListItem[],
    pagination: REST.Pagination,
    products: API.ProductListItem[]
}

export interface IAppProps {
    apps: IAppState, 
    dispatch: Dispatch
    loading: boolean
}

interface IAppModel {
    namespace: 'apps'
    state: IAppState
    reducers: {
        getPage: Reducer<IAppState>,
        getProdList: Reducer<IAppState>,
        edit:Reducer<IAppState>,
        add: Reducer<IAppState>,
    }
    effects: {
        getAppPage: Effect,
        getProductList: Effect,
        editApp: Effect,
        addApp: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}

const AppModel: IAppModel = {
    namespace: 'apps',
    state: {
        data: [],
        pagination: {} as API.Pagination,
        products: []
    },
    reducers: {
        getPage(state, action) {
            action.payload = {
                ...state,
                data: action.payload.data,
                pagination: action.payload.pagination
            };
            return action.payload
        },
        getProdList(state, action){
            action.payload = {
                ...state,
                products: action.payload.products
            };
            return action.payload
        },
        edit(state, action){
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
        *getAppPage({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(appPage,  params)
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
        *getProductList({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(getProductList,  params)
            if (data) {
                yield effects.put({
                    type: 'getProdList',
                    payload: {
                        products: data
                    }
                })
            }
        },
        *editApp({payload: params}, effects){
            if(BaseMethods.isNull(params)) return;      
            const data = yield effects.call(editApp,  params)
            if (data) {
                yield effects.put({
                    type: 'editApp',
                    payload: {
                        
                    }
                })
            }
        },
        *addApp({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(addApp,  params)
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
export default AppModel;
