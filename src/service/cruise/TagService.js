
import { getTagAction } from '../../actions/TagActions'
import { requestWithAction } from '../../api/XHRClient'
import { API } from '@/api/config'

export function getTagList(request) {
    const config = {
        method: 'post',
        url: `${API}/manage/tag/page`,
        data: request
    };
    return requestWithAction(config, getTagAction);
}

