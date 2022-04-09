import { getArticles, getArticleDetailAction } from '@/actions/ArticleActions'
import { requestWithAction } from '@/api/XHRClient'

export function getArticleList(request) {
    const config = {
        method: 'post',
        url: `/manage/app/cruise/article/v1/page`,
        data: JSON.stringify(request)
    }
    return requestWithAction(config, getArticles)
}

export function getArticleDetail(id) {
    //const config = {
    //    method: 'get',
    //    url: `/manage/app/cruise/article/v1/detail/`+id
    //}
    //return requestWithAction(config, getArticleDetailAction)
}
