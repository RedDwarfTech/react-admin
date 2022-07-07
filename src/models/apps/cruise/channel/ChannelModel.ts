import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { channelPage, pickChannel, updateChannel } from '@/services/ant-design-pro/apps/cruise/channel/channel';
import { REST } from 'js-wheel';

export interface IChannelState {
    data: API.ChannelListItem[],
    pagination: REST.Pagination,
    subStatus: number,
    pageNum: number,
    pageSize: number,
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
        subStatus: 1,
        pageSize: 20,
        pageNum: 1
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
                        pagination: data.pagination
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
