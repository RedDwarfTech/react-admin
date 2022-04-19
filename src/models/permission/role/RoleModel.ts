import { Effect, Reducer, Subscription } from 'umi';
import { rolePage, saveRoleMenuPermission } from '@/services/ant-design-pro/permission/role/role';
import { menuTree } from '@/services/ant-design-pro/permission/menu/menu';

export interface IRoleState {
    data: API.RoleItem[],
    menus: API.MenuItem,
    pagination: API.Pagination
}

interface IRoleModel {
    namespace: 'roles'
    state: IRoleState
    reducers: {
        getPage: Reducer<IRoleState>,
        getTree: Reducer<IRoleState>,
        saveTree: Reducer<IRoleState>,
    }
    effects: {
        getRolePage: Effect,
        getMenuTree: Effect,
        saveRoleMenuTree: Effect,
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
        pagination: {} as API.Pagination
    },
    reducers: {
        getPage(state, action) {
            return action.payload
        },
        getTree(state, action){
            // https://stackoverflow.com/questions/71895379/how-to-update-the-state-using-diff-way
            action.payload = {
                ...state,
                menus: action.payload.menus,
            };
            return action.payload
        },
        saveTree(state, action){
            action.payload = {
                ...state
            };
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
            const data = yield effects.call(menuTree,  params)
            if (data) {
                yield effects.put({
                    type: 'getTree',
                    payload: {
                        menus: data,
                    }
                })
            }
        },
        *saveRoleMenuTree({payload: params}, effects) {
            if(!params) return;            
            yield effects.call(saveRoleMenuPermission,  params)
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
