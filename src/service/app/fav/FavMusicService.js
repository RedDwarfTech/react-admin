import { getFavMusicPageAction } from '@/actions/app/music/fav/FavMusicActions'
import { requestWithAction } from '@/api/XHRClient'

export function getFavMusicPage(request) {
    const config = {
        method: 'post',
        url: `/manage/app/music/fav/v1/page`,
        data: request
    }
    return requestWithAction(config, getFavMusicPageAction)
}
