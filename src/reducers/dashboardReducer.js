/**
 * Created by dolphin on 15/7/2017.
 */

const dashboardReducer = (
    state = {
        dashboard: {},
        trend: {}
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
        case 'GET_TREND_DATA':
            state = {
                ...state,
                trend: action.payload
            }
            break
        default:
            break
    }
    return state
}

export default dashboardReducer
