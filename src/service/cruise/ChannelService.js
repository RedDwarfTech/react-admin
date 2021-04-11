
import { getChannels } from '../../actions/ChannelActions';
import { requestWithAction } from '../../api/XHRClient';
import { API } from '@/api/config'

export function getChannelList() {
    const config = {
        method: 'post',
        url: `${API}/manage/sub/source/page`,
        data: {}
    };
    return requestWithAction(config, getChannels);
}
