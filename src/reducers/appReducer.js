/**
 * Created by dolphin on 15/7/2017.
 */

const appReducer = (state = {
    app: {}
}, action) => {
    switch (action.type) {
        case "GET_APP_LIST":
            state = {
                ...state,
                app: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};

export default appReducer;