
import { getAppListAction } from '../../actions/AppActions'
import { requestWithAction } from '../../api/XHRClient'
import { API } from '@/api/config'

export function getAppList(request) {
    const config = {
        method: 'post',
        url: `${API}/manage/app/list`,
        data: request
    };
    return requestWithAction(config, getAppListAction);
}

