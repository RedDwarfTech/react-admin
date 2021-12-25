import { getDomainPageAction } from '@/actions/app/cernitor/domain/DomainActions'
import { requestWithAction } from '@/api/XHRClient'

export function getDomainPage(request) {
    const config = {
        method: 'post',
        url: `/manage/app/cernitor/domain/v1/page`,
        data: JSON.stringify(request)
    }
    return requestWithAction(config, getDomainPageAction)
}
