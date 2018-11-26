import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from '../../containers/App';
import SinglePage from '../SinglePage';
import configureStore from './configureStore';

const store = configureStore();

const Root = () => {
  const url = '/:section?/:id?';

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            path="/read"
            component={SinglePage}
          />
          <Route
            path={url}
            component={App}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Root;
