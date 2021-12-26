import { login, getUserListAction, changeUserPasswordAction } from '@/actions/UserActions'
import { requestWithAction, requestWithoutAction } from '@/api/XHRClient'

export function loginImpl(request) {
    const config = {
        method: 'post',
        url: `/manage/admin/user/login`,
        data: request
    }
    return requestWithAction(config, login)
}

export function getUserList(request) {
    const config = {
        method: 'post',
        url: `/manage/user/v1/page`,
        data: request
    }
    return requestWithAction(config, getUserListAction)
}

export function modifyPassword(request) {
    const config = {
        method: 'post',
        url: `/manage/user/v1/pwd/edit`,
        data: request
    }
    return requestWithAction(config, changeUserPasswordAction)
}

export function removeLoginedUserCache(request) {
    //store.dispatch(action(removeUserAction))
}
