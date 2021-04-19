import { getDashboardAction } from '../../actions/DashboardActions';
import { requestWithAction } from '../../api/XHRClient';
import { API } from '@/api/config'

export function fetchDashboard(request) {
    const config = {
        method: 'get',
        url: `${API}/manage/dashboard/overview`,
        data: JSON.stringify(request)
    };
    return requestWithAction(config, getDashboardAction);
}



