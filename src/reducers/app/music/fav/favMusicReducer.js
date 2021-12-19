/**
 * Created by dolphin on 15/7/2017.
 */

const favMusicReducer = (
    state = {
        favMusic: {}
    },
    action
) => {
    switch (action.type) {
        case 'GET_FAV_MUSIC_PAGE':
            state = {
                ...state,
                favMusic: action.payload
            }
            break
        default:
            break
    }
    return state
}

export default favMusicReducer
