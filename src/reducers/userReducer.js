/**
 * Created by dolphin on 15/7/2017.
 */

const userReducer = (state = {
    token: "",
    user: {}
}, action) => {
    switch (action.type) {
        case "LOGIN":
            state = {
                ...state,
                token: action.payload
            };
            break;
        case "GET_USER_LIST":
            state = {
                ...state,
                user: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};

export default userReducer;