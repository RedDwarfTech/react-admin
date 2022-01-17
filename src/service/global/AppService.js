import { getAppListAction, addAppAction } from '@/actions/global/AppActions'
import { requestWithAction } from '@/api/XHRClient'

export function getAppList(request) {
    const config = {
        method: 'post',
        url: `/manage/app/v1/page`,
        data: request
    }
    return requestWithAction(config, getAppListAction)
}

export function addApp(request) {
    const config = {
        method: 'post',
        url: `/manage/app/v1/add`,
        data: request
    }
    return requestWithAction(config, addAppAction)
}
