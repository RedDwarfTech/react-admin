import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { userMenuTree } from '@/services/ant-design-pro/permission/menu/menu';
import { REST } from 'js-wheel';
import { addIapProduct, iapProductPage } from '@/services/ant-design-pro/apps/overview/iap_product';
import BaseMethods from 'js-wheel/dist/src/utils/data/BaseMethods';

export interface IIapProductState {
    data: API.ProductListItem[],
    pagination: REST.Pagination
}

export interface IIapProductProps {
    iapproducts: IIapProductState, 
    dispatch: Dispatch
    loading: boolean
}

interface IIapProductModel {
    namespace: 'iapproducts'
    state: IIapProductState
    reducers: {
        getPage: Reducer<IIapProductState>,
        getList: Reducer<IIapProductState>,
        edit:Reducer<IIapProductState>,
        add: Reducer<IIapProductState>,
    }
    effects: {
        getIapProductPage: Effect,
        getProductList: Effect,
        editProduct: Effect,
        addProduct: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}

const IapProductModel: IIapProductModel = {
    namespace: 'iapproducts',
    state: {
        data: [],
        pagination: {} as API.Pagination,
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
        getList(state, action){
            action.payload = {
                ...state,
                products: action.payload.products,
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
        *getIapProductPage({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(iapProductPage,  params)
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
            const data = yield effects.call(userMenuTree,  params)
            if (data) {
                yield effects.put({
                    type: 'getList',
                    payload: {
                        data: data,
                        meta: {
                            ...params
                        }
                    }
                })
            }
        },
        *editProduct({payload: params}, effects){
            if(BaseMethods.isNull(params)) return;
            const data = yield effects.call(editProductImpl,  params)
            if (data) {
                yield effects.put({
                    type: 'editProduct',
                    payload: {
                        
                    }
                })
            }
        },
        *addProduct({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(addIapProduct,  params)
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
export default IapProductModel;
