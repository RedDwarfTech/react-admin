/**
 * Created by dolphin on 15/7/2017.
 */

export function getDomainPageAction(request) {
    return {
        type: 'GET_DOMAIN_PAGE',
        payload: request
    }
}
