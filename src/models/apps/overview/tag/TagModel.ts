import { Effect, Reducer, Subscription } from 'umi';
import { userPage } from '@/services/ant-design-pro/permission/user/user';
import { REST } from 'js-wheel';
import { getTagsList } from '@/services/ant-design-pro/apps/overview/tag';

export interface ITagState {
    data: API.TagItem[],
    tags: API.TagItem[],
    pagination: REST.Pagination
}

interface ITagModel {
    namespace: 'tags'
    state: ITagState
    reducers: {
        getPage: Reducer<ITagState>,
        getTagList: Reducer<ITagState>,
    }
    effects: {
        getUserPage: Effect,
        getAppTagList: Effect,
    }
    subscriptions: {
        setup: Subscription
    }
}

const UserModel: ITagModel = {
    namespace: 'tags',
    state: {
        data: [] as API.TagItem[],
        tags: [] as API.TagItem[],
        pagination: {} as REST.Pagination
    },
    reducers: {
        getPage(state, action) {
            return action.payload
        },
        getTagList(state, action){
            action.payload = {
                ...state,
                tags: action.payload.tags,
            };
            return action.payload
        },
    },
    effects: {
        *getUserPage({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(userPage,  params)
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
        *getAppTagList({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(getTagsList,  params)
            if (data) {
                yield effects.put({
                    type: 'getTagList',
                    payload: {
                        tags: data
                    }
                })
            }
        },
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
export default UserModel;
