import { Dispatch, Effect, Reducer, Subscription } from 'umi';
import { addNewUser, changePassword, getUserRoles, saveUserRoles } from '@/services/ant-design-pro/permission/user/user';
import { REST } from 'js-wheel';
import { roleList } from '@/services/ant-design-pro/permission/role/role';
import { addNewDict, dictPage } from '@/services/ant-design-pro/system/dict/dict';

export interface IDictState {
    data: API.DictItem[],
    roles: API.DictItem[],
    orgs: API.OrgItem[],
    userRoles: API.UserRole[],
    pagination: REST.Pagination
}

export interface IDictPageProps {
    dict: IDictState
    dispatch: Dispatch
    loading: boolean
}

interface IDictModel {
    namespace: 'dict'
    state: IDictState
    reducers: {
        getPage: Reducer<IDictState>,
        getRoleList: Reducer<IDictState>,
        getOrgList: Reducer<IDictState>,
        getUserRoles: Reducer<IDictState>,
        saveUserRoles: Reducer<IDictState>,
        clearUserState: Reducer<IDictState>,
        addDict: Reducer<IDictState>,
        changePwd: Reducer<IDictState>,
    }
    effects: {
        getDictPage: Effect,
        getSysRoleList: Effect,
        getSysOrgList: Effect,
        getCurrentUserRoles: Effect,
        saveCurrentUserRoles: Effect,
        clearCurrentUser: Effect,
        addNewDict: Effect,
        changeUserPwd: Effect,
    }
    subscriptions: {
        setup: Subscription
    }
}

const DictModel: IDictModel = {
    namespace: 'dict',
    state: {
        data: [],
        roles: [],
        orgs: [],
        userRoles:[],
        pagination: {} as REST.Pagination
    },
    reducers: {
        getPage(state, action) {
            return action.payload
        },
        getRoleList(state, action){
            action.payload = {
                ...state,
                roles: action.payload.roles,
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
        addDict(state, action){
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
        *getDictPage({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(dictPage,  params)
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
        *getSysRoleList({payload: params}, effects){
            if(!params) return;            
            const data = yield effects.call(roleList,  params)
            if (data) {
                yield effects.put({
                    type: 'getRoleList',
                    payload: {
                        roles: data
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
        *addNewDict({payload: params}, effects){
            const data = yield effects.call(addNewDict,  params)
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
export default DictModel;
