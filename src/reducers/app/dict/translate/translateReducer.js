/**
 * Created by dolphin on 15/7/2017.
 */

const translateReducer = (
    state = {
        translate: {}
    },
    action
) => {
    switch (action.type) {
        case 'GET_TRANSLATE':
            state = {
                ...state,
                translate: action.payload
            }
            break
        default:
            break
    }
    return state
}

export default translateReducer
