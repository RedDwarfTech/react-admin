/**
 * Created by dolphin on 15/7/2017.
 */
export function getChannels(payload) {
    return {
        type: "GET_CHANNEL_LIST",
        payload: payload
    };
}
