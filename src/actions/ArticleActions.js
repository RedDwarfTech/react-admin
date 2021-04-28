/**
 * Created by dolphin on 15/7/2017.
 */
export function getArticles(payload) {
    return {
        type: 'GET_ARTICLE_LIST',
        payload: payload
    }
}

export function getArticleDetailAction(payload) {
    return {
        type: 'GET_ARTICLE_DETAIL',
        payload: payload
    }
}
