import { getArticles, getArticleDetailAction } from '../../actions/ArticleActions'
import { requestWithAction } from '../../api/XHRClient'
import { API } from '@/api/config'

export function getArticleList(request) {
    const config = {
        method: 'post',
        url: `${API}/manage/article/page`,
        data: JSON.stringify(request)
    }
    return requestWithAction(config, getArticles)
}

export function getArticleDetail(id) {
    const config = {
        method: 'get',
        url: `${API}/manage/article/`+id
    }
    return requestWithAction(config, getArticleDetailAction)
}
