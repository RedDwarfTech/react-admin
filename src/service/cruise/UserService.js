
import { login } from '../../actions/UserActions';
import { requestWithAction } from '../../api/XHRClient';
import { API } from '@/api/config'

export function loginImpl(request) {
    const config = {
        method: 'post',
        url: `${API}/manage/user/login`,
        data: request
    };
    return requestWithAction(config, login);
}
