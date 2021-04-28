/**
 * Created by dolphin on 15/7/2017.
 */

const articleReducer = (
    state = {
        article: {},
        articleDetail:{}
    },
    action
) => {
    switch (action.type) {
        case 'GET_ARTICLE_LIST':
            state = {
                ...state,
                article: action.payload
            }
            break
        case 'GET_ARTICLE_DETAIL':
            state = {
                ...state,
                articleDetail: action.payload
            }
            break
        default:
            break
    }
    return state
}

export default articleReducer
