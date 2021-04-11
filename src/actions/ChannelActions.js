/**
 * Created by dolphin on 15/7/2017.
 */
export function getChannels(name) {
    return {
        type: "GET_CHANNEL",
        name: name
    };
}
