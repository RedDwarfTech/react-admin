import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import user from '../reducers/userReducer'
import channel from '../reducers/channelReducer'
import article from '../reducers/articleReducer'
import dashboard from '../reducers/dashboardReducer'
import app from '../reducers/appReducer'
import tag from '../reducers/tagReducer'
import reduxThunk from 'redux-thunk'
import favMusic from '@/reducers/app/music/fav/favMusicReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
    combineReducers({
        user,
        channel,
        article,
        dashboard,
        app,
        tag,
        favMusic
    }),
    composeEnhancers(applyMiddleware(reduxThunk))
)
