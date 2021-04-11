import { createStore, combineReducers, applyMiddleware,compose } from "redux";
import user from "../reducers/userReducer";
import channel from "../reducers/channelReducer";
import reduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers({
        user,
        channel
    }),
    composeEnhancers(applyMiddleware(reduxThunk))
);

