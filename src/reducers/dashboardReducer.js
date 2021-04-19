/**
 * Created by dolphin on 15/7/2017.
 */

const dashboardReducer = (
    state = {
        dashboard: {}
    },
    action
) => {
    switch (action.type) {
        case 'GET_DASHBOARD_DATA':
            state = {
                ...state,
                dashboard: action.payload
            }
            break
        default:
            break
    }
    return state
}

export default dashboardReducer
