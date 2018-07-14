import React from 'react';
import {render} from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from 'redux';

import {todos, visibilityFilter} from './store/reducers';

import Root from './components/Root';

import './index.css';

const root = document.getElementById('root');

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);

render(
  <Root store={store}/>,
  root
);


registerServiceWorker();
