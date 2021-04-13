import { getArticles } from '../../actions/ArticleActions'
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
