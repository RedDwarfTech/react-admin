import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { pickChannel, updateChannel } from '@/services/ant-design-pro/apps/cruise/channel/channel';
import { trendList } from '@/services/ant-design-pro/apps/cruise/overview/cruise-overview';

export interface ITrendState {
    data: API.TrendListItem[],
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
        pickChannel: Reducer<ITrendState>,
        update: Reducer<ITrendState>
    }
    effects: {
        getTrendsList: Effect,
        editorPickChannel: Effect,
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
    },
    reducers: {
        getTrends(state, action) {
            action.payload = {
                ...state,
                data: action.payload.data,
            };
            return action.payload
        },
        pickChannel(state, action){
            action.payload = {
                ...state
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
                let sortedTrends = data.sort((a:any,b:any) => a.statistic_time > b.statistic_time);
                yield effects.put({
                    type: 'getTrends',
                    payload: {
                        data: sortedTrends,
                    }
                })
            }
        },
        *editorPickChannel({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(pickChannel,  params)
            if (data) {
                yield effects.put({
                    type: 'pickChannel',
                    payload: {
                        
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
