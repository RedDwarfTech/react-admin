import { Effect, Reducer, Subscription } from 'umi';
import { getUserRoles, userPage } from '@/services/ant-design-pro/permission/user/user';
import { REST } from 'js-wheel';
import { roleList } from '@/services/ant-design-pro/permission/role/role';

export interface IUserState {
    data: API.AdminUserItem[],
    roles: API.RoleItem[],
    userRoles: API.UserRole[],
    pagination: REST.Pagination
}

interface IUserModel {
    namespace: 'users'
    state: IUserState
    reducers: {
        getPage: Reducer<IUserState>,
        getRoleList: Reducer<IUserState>,
        getUserRoles: Reducer<IUserState>
    }
    effects: {
        getUserPage: Effect,
        getSysRoleList: Effect,
        getCurrentUserRoles: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}

const UserModel: IUserModel = {
    namespace: 'users',
    state: {
        data: [] as API.AdminUserItem[],
        roles: [] as API.RoleItem[],
        userRoles:[] as API.UserRole[],
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
        getUserRoles(state, action){
            action.payload = {
                ...state,
                userRoles: action.payload.userRoles,
            };
            return action.payload
        }
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
export default UserModel;
