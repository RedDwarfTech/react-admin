import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { channelPage, updateChannel } from '@/services/ant-design-pro/apps/cruise/channel/channel';
import { trendList } from '@/services/ant-design-pro/apps/cruise/overview/cruise-overview';

export interface ITrendState {
    data: API.TrendListItem[],
    topNumArticleChannel: API.ChannelListItem[],
    topQualityArticleChannel: API.ChannelListItem[]
}

export interface ITrendPageProps {
    trends: ITrendState
    dispatch: Dispatch
    loading: boolean
}

interface ITrendModel {
    namespace: 'trends'
    state: ITrendState
    reducers: {
        getTrends: Reducer<ITrendState>,
        setArticleTopChannel: Reducer<ITrendState>,
        getArticleQualityTopChannel: Reducer<ITrendState>,
        update: Reducer<ITrendState>
    }
    effects: {
        getTrendsList: Effect,
        getArticleTopChannel: Effect,
        articleQualityTopChannel: Effect,
        updateChannel: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}

const TrendModel: ITrendModel = {
    namespace: 'trends',
    state: {
        data: [] as API.TrendListItem[],
        topNumArticleChannel: [],
        topQualityArticleChannel: []
    },
    reducers: {
        getTrends(state, action) {
            action.payload = {
                ...state,
                data: action.payload.data,
            };
            return action.payload
        },
        setArticleTopChannel(state, action){
            action.payload = {
                ...state,
                topNumArticleChannel: action.payload.topNumArticleChannel
            };
            return action.payload
        },
        getArticleQualityTopChannel(state, action){
            action.payload = {
                ...state,
                topQualityArticleChannel: action.payload.topQualityArticleChannel
            };
            return action.payload
        },
        update(state, action){
            action.payload = {
                ...state,
            };
            return action.payload
        }
    },
    effects: {
        *getTrendsList({payload: params}, effects) {
            if(!params) return;       
            if(!params.startTime) return;
            if(!params.endTime) return;
            const data = yield effects.call(trendList,  params)
            if (data) {
                let sortedTrends = data.sort((a:any,b:any) => (a.statistic_time < b.statistic_time)?-1:1);
                yield effects.put({
                    type: 'getTrends',
                    payload: {
                        data: sortedTrends,
                    }
                })
            }
        },
        *getArticleTopChannel({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(channelPage,  params)
            if (data) {
                yield effects.put({
                    type: 'setArticleTopChannel',
                    payload: {
                        topNumArticleChannel: data.data
                    }
                })
            }
        },
        *articleQualityTopChannel({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(channelPage,  params)
            if (data) {
                yield effects.put({
                    type: 'getArticleQualityTopChannel',
                    payload: {
                        topQualityArticleChannel: data.data
                    }
                })
            }
        },
        *updateChannel({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(updateChannel,  params)
            if (data) {
                yield effects.put({
                    type: 'update',
                    payload: {
                        
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
export default TrendModel;
