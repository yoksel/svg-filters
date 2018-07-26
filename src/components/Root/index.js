import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from '../../containers/App';
import configureStore from './configureStore';

const store = configureStore();

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
