import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { add, menuTree, userMenuTree } from '@/services/ant-design-pro/permission/menu/menu';
import { REST } from 'js-wheel';
import { orgPage } from '@/services/ant-design-pro/permission/org/org';
import { addProduct, productPage } from '@/services/ant-design-pro/apps/overview/product';

export interface IProductState {
    data: API.ProductListItem[],
    pagination: REST.Pagination
}

export interface IProductProps {
    orgs: IProductState, 
    dispatch: Dispatch
    loading: boolean
}

interface IProductModel {
    namespace: 'products'
    state: IProductState
    reducers: {
        getPage: Reducer<IProductState>,
        getUserMenus: Reducer<IProductState>,
        getTree:Reducer<IProductState>,
        add: Reducer<IProductState>,
    }
    effects: {
        getProductPage: Effect,
        getUserMenuList: Effect,
        getFullMenuTree: Effect,
        addProduct: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}

const ProductModel: IProductModel = {
    namespace: 'products',
    state: {
        data: [],
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
        *getProductPage({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(productPage,  params)
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
        *addProduct({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(addProduct,  params)
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
export default ProductModel;
