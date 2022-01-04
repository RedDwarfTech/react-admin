import { getChannels,editChannelAction,editorPickChannelAction } from '../../actions/ChannelActions';
import { requestWithAction } from '../../api/XHRClient';

export function getChannelList(request) {
    const config = {
        method: 'post',
        url: `/manage/app/cruise/channel/v1/page`,
        data: JSON.stringify(request)
    };
    return requestWithAction(config, getChannels);
}

export function editChannel(request) {
    const config = {
        method: 'post',
        url: `/manage/sub/source/update`,
        data: JSON.stringify(request)
    };
    return requestWithAction(config, editChannelAction);
}

export function editorPickChannel(request) {
    const config = {
        method: 'post',
        url: `/manage/sub/source/editor-pick`,
        data: JSON.stringify(request)
    };
    return requestWithAction(config, editorPickChannelAction);
}