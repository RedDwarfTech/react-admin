/**
 * Created by dolphin on 15/7/2017.
 */

const domainReducer = (
    state = {
        domain: {}
    },
    action
) => {
    switch (action.type) {
        case 'GET_DOMAIN_PAGE':
            state = {
                ...state,
                domain: action.payload
            }
            break
        default:
            break
    }
    return state
}

export default domainReducer
