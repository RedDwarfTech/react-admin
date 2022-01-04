import { getTranslateAction, addGlossaryAction } from '@/actions/app/dict/translate/TranslateActions'
import { requestWithAction } from '@/api/XHRClient'

export function getTranslate(request) {
    const config = {
        method: 'post',
        url: `/manage/app/dict/translate/v1/translate`,
        data: JSON.stringify(request)
    }
    return requestWithAction(config, getTranslateAction)
}

export function addGlossary(request) {
    const config = {
        method: 'post',
        url: `/manage/app/dict/word/v1/glossary/add`,
        data: JSON.stringify(request)
    }
    return requestWithAction(config, addGlossaryAction)
}
