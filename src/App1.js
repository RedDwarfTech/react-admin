import React from 'react'
import { connect } from 'react-redux';
import loadable from './utils/loadable'
import 'animate.css'
import './style/base.scss'
import './style/App.scss'
import {login} from './actions/UserActions'

class App extends React.Component {
    render() {
        return (<div className='demo'>ddddddd</div>)
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {
            dispatch(login(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
