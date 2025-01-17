import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { channelPage, pickChannel, updateChannel } from '@/services/ant-design-pro/apps/cruise/channel/channel';
import { Pagination } from 'rdjs-wheel';

export interface IChannelState {
    data: API.ChannelListItem[],
    pagination: Pagination,
    params: {
        subStatus: number,
        editorPick: number|null,
        sort: string,
        direction: string,
        pageNum: number,
        pageSize: number,
        minimalReputation: number|null,
        maximalReputation: number|null,
    }
}

export interface IChannelPageProps {
    channels: IChannelState
    dispatch: Dispatch
    loading: boolean
}

interface IChannelModel {
    namespace: 'channels'
    state: IChannelState
    reducers: {
        getPage: Reducer<IChannelState>,
        pickChannel: Reducer<IChannelState>,
        update: Reducer<IChannelState>
    }
    effects: {
        getChannelPage: Effect,
        editorPickChannel: Effect,
        updateChannel: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}


const ChannelModel: IChannelModel = {
    namespace: 'channels',
    state: {
        data: [] as API.ChannelListItem[],
        pagination: {} as API.Pagination,
        pageSize: 10,
        pageNum: 1,
        params: {
            subStatus: 1,
            editorPick: 1,
            sort: 'created_time',
            direction: 'desend',
            pageNum: 1,
            pageSize: 10
        }
    },
    reducers: {
        getPage(state, action) {
            action.payload = {
                ...state,
                data: action.payload.data,
                pagination: action.payload.pagination,
                params: action.payload.params
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
        *getChannelPage({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(channelPage,  params)
            if (data) {
                yield effects.put({
                    type: 'getPage',
                    payload: {
                        data: data.data,
                        pagination: data.pagination,
                        params: params
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
export default ChannelModel;
