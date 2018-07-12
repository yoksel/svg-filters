import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import {primitives, primitiveControls, presetControls} from './store/reducers';
import App from './components/App';
import {primitivesData, presetsData} from './components/Data';

import './index.css';

const appReducers = combineReducers({
  primitives: primitives,
  primitiveControls: primitiveControls,
  presetControls: presetControls
});

const store = createStore(appReducers);

// Add initial data
store.dispatch({
  type: 'ADD_All_PRIMITIVE_CONTROLS',
  data: primitivesData
});
store.dispatch({
  type: 'ADD_All_PRESET_CONTROLS',
  data: presetsData
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
