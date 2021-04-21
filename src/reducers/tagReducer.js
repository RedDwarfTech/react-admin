/**
 * Created by dolphin on 15/7/2017.
 */

const tagReducer = (state = {
    tag: {}
}, action) => {
    switch (action.type) {
        case "GET_TAG_LIST":
            state = {
                ...state,
                tag: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};

export default tagReducer;