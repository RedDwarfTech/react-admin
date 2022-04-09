import { Effect, Reducer, Subscription } from 'umi';
import { articleDetail } from '@/services/ant-design-pro/apps/cruise/article/article';

export interface IArticleState {
    data: API.ArticleListItem,
    meta: {
        total: number
        per_page: number
        page: number
    }
}

interface IArticleModel {
    namespace: 'articles'
    state: IArticleState
    reducers: {
        getDetail: Reducer<IArticleState>
    }
    effects: {
        getArticleDetail: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}

const ArticleModel: IArticleModel = {
    namespace: 'articles',
    state: {
        data: {},
        meta: {
            current: 1,
            pageSize: 10,
            page: 1
        }
    },
    reducers: {
        getDetail(state, action){
            return action.payload
        }
    },
    effects: {
        *getArticleDetail({payload: params}, effects){
            if(!params) return;           
            const data = yield effects.call(articleDetail,  params)
            if (data) {
                yield effects.put({
                    type: 'getDetail',
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
export default ArticleModel;
