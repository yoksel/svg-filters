import React from 'react';

import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import App from '../App';

const Root = () => {
  return (
    <Router>
      <Route
        path="/:sidebarList?/:presetId?"
        component={App}
      />
    </Router>
  );
};

export default Root;

Root.propTypes = {
  props: PropTypes.object
};
