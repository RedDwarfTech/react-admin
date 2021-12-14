
import { getAppListAction } from '../../actions/AppActions'
import { requestWithAction } from '../../api/XHRClient'

export function getAppList(request) {
    const config = {
        method: 'post',
        url: `/manage/app/page`,
        data: request
    };
    return requestWithAction(config, getAppListAction);
}

