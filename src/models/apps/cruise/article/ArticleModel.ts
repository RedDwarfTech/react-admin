import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { articleDetail, articlePage } from '@/services/ant-design-pro/apps/cruise/article/article';
import { REST } from 'js-wheel';

export interface IArticleState {
    data: API.ArticleListItem[],
    article: API.ArticleListItem,
    pagination: REST.Pagination,
    maxOffset: number
}

export interface ArticleDetailProps {
    articles: IArticleState
    dispatch: Dispatch
    loading: boolean
}

interface IArticleModel {
    namespace: 'articles'
    state: IArticleState
    reducers: { 
        getPage: Reducer<IArticleState>,
        getDetail: Reducer<IArticleState>
    }
    effects: {
        getArticlePage: Effect,
        getArticleDetail: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}

const ArticleModel: IArticleModel = {
    namespace: 'articles',
    state: {
        data: [] as API.ArticleListItem[],
        pagination: {} as API.Pagination,
        maxOffset: 0,
        article: {} as API.ArticleListItem
    },
    reducers: {
        getPage(state, action){
           let maxOffset =Math.max.apply(Math, action.payload.data?.map(function(o: { id: any; }) { return o.id; }))
            action.payload = {
                ...state,
                pagination: action.payload.pagination,
                data: action.payload.data,
                maxOffset: state?.maxOffset===0?maxOffset:state?.maxOffset
            };
            return action.payload
        },
        getDetail(state, action){
            action.payload = {
                ...state,
                article: action.payload.article
            };
            return action.payload
        }
    },
    effects: {
        *getArticlePage({payload: params}, effects){
            if(!params) return;     
            const data: API.EntityList<API.ArticleListItem> = yield effects.call(articlePage,  params)
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
        *getArticleDetail({payload: params}, effects){
            if(!params) return;           
            const data = yield effects.call(articleDetail,  params)
            if (data) {
                yield effects.put({
                    type: 'getDetail',
                    payload: {
                        article: data,
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
