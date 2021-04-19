/**
 * Created by dolphin on 15/7/2017.
 */
 export function getDashboardAction(payload) {
    return {
        type: "GET_DASHBOARD_DATA",
        payload: payload
    };
}
