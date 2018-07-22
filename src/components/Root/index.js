import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';

import {primitivesData, presetsData} from '../Data';
import {addPreset} from '../../store/actions';
import App from '../App';

import configureStore from './configureStore';

const store = configureStore();

// Add initial data
store.dispatch({
  type: 'ADD_All_PRIMITIVE_CONTROLS',
  data: primitivesData
});
store.dispatch({
  type: 'ADD_All_PRESET_CONTROLS',
  data: presetsData
});

const setPreset = (presetId) => {
  if (!presetId) {
    return null;
  }

  const state = store.getState();
  const presets = state.presetControls;
  const currentPreset = presets.filter(item => item.id === presetId)[0];

  if (currentPreset) {
    store.dispatch(addPreset(currentPreset));
  }
};

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route
          path="/:sidebarList?/:presetId?"
          component={App}
        />
      </Router>
    </Provider>
  );
};

export default Root;

Root.propTypes = {
  props: PropTypes.object
};
