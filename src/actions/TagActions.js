/**
 * Created by dolphin on 15/7/2017.
 */

 export function getTagAction(request) {
    return {
        type: "GET_TAG_LIST",
        payload: request
    };
}
