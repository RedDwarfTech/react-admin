import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { articleDetails } from '@/services/ant-design-pro/apps/cruise/article/article';
import { musicPage } from '@/services/ant-design-pro/apps/music/music/music';
import { Pagination } from 'rdjs-wheel';

export interface IMusicState {
    data: API.MusicListItem[],
    music: API.MusicListItem,
    pagination: Pagination,
    maxOffset: number
}

export interface IMusicPageProps {
    musics: IMusicState
    dispatch: Dispatch
    loading: boolean
}

export interface MusicDetailProps {
    musics: IMusicState
    dispatch: Dispatch
    loading: boolean
}

interface IMusicModel {
    namespace: 'musics'
    state: IMusicState
    reducers: { 
        getPage: Reducer<IMusicState>,
        getDetail: Reducer<IMusicState>
    }
    effects: {
        getMusicPage: Effect,
        getArticleDetail: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}

const MusicModel: IMusicModel = {
    namespace: 'musics',
    state: {
        data: [] as API.MusicListItem[],
        pagination: {} as API.Pagination,
        maxOffset: 0,
        music: {} as API.MusicListItem
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
        *getMusicPage({payload: params}, effects){
            if(!params) return;     
            const data: API.EntityList<API.MusicListItem> = yield effects.call(musicPage,  params)
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
export default MusicModel;
