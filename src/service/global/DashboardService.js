import { getDashboardAction, getTrendAction } from '../../actions/DashboardActions'
import { requestWithAction } from '../../api/XHRClient'

export function fetchDashboard(request) {
    const config = {
        method: 'get',
        url: `/manage/home/v1/dashboard/overview`,
        data: JSON.stringify(request)
    }
    return requestWithAction(config, getDashboardAction)
}

export function fetchTrend(request) {
    const config = {
        method: 'post',
        url: `/manage/home/v1/trend/overview`,
        data: JSON.stringify(request)
    }
    return requestWithAction(config, getTrendAction)
}
