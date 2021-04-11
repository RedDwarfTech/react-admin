/**
 * Created by dolphin on 15/7/2017.
 */

const channelReducer = (state = {
    channel: {}
}, action) => {
    switch (action.type) {
        case "GET_CHANNEL_LIST":
            state = {
                ...state,
                channel: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};

export default channelReducer;