import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import reducers from './store/reducers';
import App from './components/App';
import {primitivesList} from './components/Data';

import './index.css';

const appReducers = combineReducers({
  primitives: reducers.primitives,
  primitiveControls: reducers.primitiveControls
});

const store = createStore(appReducers);

// Filling store
primitivesList.forEach(primitive => {
  store.dispatch({
    type: 'ADD_PRIMITIVE_CONTROL',
    id: primitive.id,
    groupName: primitive.groupName,
    name: primitive.name,
    params: primitive.params,
    paramsValues: primitive.paramsValues,
    children: primitive.children
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  root
);

registerServiceWorker();

// Filter
// -- Primitive

// PrimitiveControls
// -- PrimitiveControl

// FilterContsructor
// -- PrimitivePanel

// Presets
// -- Preset
