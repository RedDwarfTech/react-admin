import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import user from '../reducers/userReducer'
import channel from '../reducers/channelReducer'
import article from '../reducers/articleReducer'
import reduxThunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
    combineReducers({
        user,
        channel,
        article,
        dashboard
    }),
    composeEnhancers(applyMiddleware(reduxThunk))
)
