import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';
import Main from 'components/Main.jsx';
// import {unit, weather, weatherForm, forecast} from 'states/weather-reducers.js';
import {ListPosts, Home, Create, Mystuff, Music, Login, Registor, Main_state} from 'states/post-reducers.js';
// import {todoForm, todo} from 'states/todo-reducers.js';
// import {main} from 'states/main-reducers.js';

import 'bootstrap/dist/css/bootstrap.css';

window.onload = function() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({
        ListPosts,
        Home,
        Create,
        Mystuff,
        Music,
        Login,
        Registor,
        Main_state
    }), composeEnhancers(applyMiddleware(thunkMiddleware)));

    ReactDOM.render(
        <Provider store={store}>
            <Main />
        </Provider>,
        document.getElementById('root')
    );
};
