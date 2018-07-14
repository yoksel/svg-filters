import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';

import reducers from './store/reducers';
import Root from './components/Root';
import {primitivesData, presetsData} from './components/Data';

import './index.css';

const store = createStore(reducers);

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
  <Root store={store}/>,
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
