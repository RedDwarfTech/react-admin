
import { getTagAction } from '../../actions/TagActions'
import { requestWithAction } from '../../api/XHRClient'

export function getTagList(request) {
    const config = {
        method: 'post',
        url: `/manage/tag/page`,
        data: request
    };
    return requestWithAction(config, getTagAction);
}

