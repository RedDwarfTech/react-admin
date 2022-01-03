/**
 * Created by dolphin on 15/7/2017.
 */

export function getTranslateAction(request) {
    return {
        type: 'GET_TRANSLATE',
        payload: request
    }
}
