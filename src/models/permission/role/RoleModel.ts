import { Effect, Reducer, Subscription } from 'umi';
import { rolePage, saveRoleMenuPermission } from '@/services/ant-design-pro/permission/role/role';
import { roleMenuTree } from '@/services/ant-design-pro/permission/menu/menu';

export interface IRoleState {
    data: API.RoleItem[],
    menus: API.MenuItem,
    selectedMenus: number[],
    pagination: API.Pagination
}

interface IRoleModel {
    namespace: 'roles'
    state: IRoleState
    reducers: {
        getPage: Reducer<IRoleState>,
        getTree: Reducer<IRoleState>,
        saveTree: Reducer<IRoleState>,
        clear: Reducer<IRoleState>
    }
    effects: {
        getRolePage: Effect,
        getMenuTree: Effect,
        saveRoleMenuTree: Effect,
        clearRoleState: Effect
    }
    subscriptions: {
        setup: Subscription
    }
}


const RoleModel: IRoleModel = {
    namespace: 'roles',
    state: {
        // https://stackoverflow.com/questions/71907531/is-it-possible-to-give-an-empty-object-in-react-state-for-the-init-default-value
        data: [] as API.RoleItem[],
        menus: {} as API.MenuItem,
        pagination: {} as API.Pagination,
        selectedMenus: []
    },
    reducers: {
        getPage(state, action) {
            return action.payload
        },
        getTree(state, action){
            // https://stackoverflow.com/questions/71895379/how-to-update-the-state-using-diff-way
            action.payload = {
                ...state,
                menus: action.payload.menus.menus,
                selectedMenus: action.payload.menus.checked_keys
            };
            return action.payload
        },
        saveTree(state, action){
            action.payload = {
                ...state
            };
            return action.payload
        },
        clear(state, action){
            action.payload = {
                ...state,
                selectedMenus: [],
                menus: {}
            };
            debugger
            return action.payload
        },
    },
    effects: {
        *getRolePage({payload: params}, effects) {
            if(!params) return;            
            const data: API.EntityList<API.RoleItem> = yield effects.call(rolePage,  params)
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
        *getMenuTree({payload: params}, effects) {
            if(!params) return;            
            const data = yield effects.call(roleMenuTree,  params)
            if (data) {
                yield effects.put({
                    type: 'getTree',
                    payload: {
                        menus: data
                    }
                })
            }
        },
        *saveRoleMenuTree({payload: params}, effects) {
            if(!params) return;            
            yield effects.call(saveRoleMenuPermission,  params)
        },
        *clearRoleState({payload: params}, effects) {
            debugger
            yield effects.put({
                type: 'clear',
                payload: {
                    
                }
            })
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
export default RoleModel;
