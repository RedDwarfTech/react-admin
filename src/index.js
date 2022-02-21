import React from 'react'
import ReactDOM from 'react-dom'
import { Button, DatePicker, version } from 'antd'
import 'antd/dist/antd.css'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

const AppView = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(AppView, document.getElementById('root'))
