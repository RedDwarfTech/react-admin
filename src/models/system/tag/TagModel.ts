import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { addNewUser, changePassword, getUserRoles, saveUserRoles } from '@/services/ant-design-pro/permission/user/user';
import { roleList } from '@/services/ant-design-pro/permission/role/role';
import { getTagList, tagPage } from '@/services/ant-design-pro/system/tag/tag';
import { Pagination } from 'rdjs-wheel';

export interface ITagState {
    data: API.TagItem[],
    tags: API.TagItem[],
    pagination: Pagination
}

export interface ITagPageProps {
    tags: ITagState
    dispatch: Dispatch
    loading: boolean
}

interface ITagModel {
    namespace: 'tags'
    state: ITagState
    reducers: {
        getPage: Reducer<ITagState>,
        getList: Reducer<ITagState>,
        getOrgList: Reducer<ITagState>,
        getUserRoles: Reducer<ITagState>,
        saveUserRoles: Reducer<ITagState>,
        clearUserState: Reducer<ITagState>,
        addUser: Reducer<ITagState>,
        changePwd: Reducer<ITagState>,
    }
    effects: {
        getTagPage: Effect,
        getTagList: Effect,
        getSysOrgList: Effect,
        getCurrentUserRoles: Effect,
        saveCurrentUserRoles: Effect,
        clearCurrentUser: Effect,
        addNewUser: Effect,
        changeUserPwd: Effect,
    }
    subscriptions: {
        setup: Subscription
    }
}

const TagModel: ITagModel = {
    namespace: 'tags',
    state: {
        data: [],
        tags:[],
        pagination: {} as Pagination
    },
    reducers: {
        getPage(state, action) {
            return action.payload
        },
        getList(state, action){
            action.payload = {
                ...state,
                tags: action.payload.tags,
            };
            return action.payload
        },
        getOrgList(state, action){
            action.payload = {
                ...state,
                orgs: action.payload.orgs,
            };
            return action.payload
        },
        getUserRoles(state, action){
            action.payload = {
                ...state,
                userRoles: action.payload.userRoles,
            };
            return action.payload
        },
        saveUserRoles(state, action){
            action.payload = {
                ...state,
            };
            return action.payload
        },
        clearUserState(state, action){
            action.payload = {
                ...state,
                userRoles:[]
            };
            return action.payload
        },
        addUser(state, action){
            action.payload = {
                ...state,
            };
            return action.payload
        },
        changePwd(state, action){
            action.payload = {
                ...state,
            };
            return action.payload
        }
    },
    effects: {
        *getTagPage({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(tagPage,  params)
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
        *getTagList({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(getTagList,  params)
            if (data) {
                yield effects.put({
                    type: 'getList',
                    payload: {
                        tags: data
                    }
                })
            }
        },
        *getSysOrgList({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(roleList,  params)
            if (data) {
                yield effects.put({
                    type: 'getOrgList',
                    payload: {
                        orgs: data
                    }
                })
            }
        },
        *getCurrentUserRoles({payload: params}, effects){
            const data = yield effects.call(getUserRoles,  params)
            if (data) {
                yield effects.put({
                    type: 'getUserRoles',
                    payload: {
                        userRoles: data
                    }
                })
            }
        },
        *saveCurrentUserRoles({payload: params}, effects){
            const data = yield effects.call(saveUserRoles,  params)
            if (data) {
                yield effects.put({
                    type: 'saveUserRoles',
                    payload: {
                        
                    }
                })
            }
        },
        *clearCurrentUser({payload: params}, effects){
            yield effects.put({
                type: 'clearUserState',
                payload: {
                    
                }
            })
        },
        *addNewUser({payload: params}, effects){
            const data = yield effects.call(addNewUser,  params)
            if (data) {
                yield effects.put({
                    type: 'addUser',
                    payload: {
                        
                    }
                })
            }
        },
        *changeUserPwd({payload: params}, effects){
            const data = yield effects.call(changePassword,  params)
            if (data) {
                yield effects.put({
                    type: 'addUser',
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
export default TagModel;
