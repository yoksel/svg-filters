import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import {Provider} from 'react-redux';

import {todos, visibilityFilter} from './store/reducers';

import App from './components/App';

import './index.css';

const root = document.getElementById('root');

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <App/>
  </Provider>,
  root
);


registerServiceWorker();
