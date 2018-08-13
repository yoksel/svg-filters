import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Palette.css';

class Palette extends Component {
  render() {
    return (
      <div className="Palette">
        <ul>
          <li className="hlgt hlgt--red">hlgt--red</li>
          <li className="hlgt hlgt--orange">hlgt--orange</li>
          <li className="hlgt hlgt--gold">hlgt--gold</li>
          <li className="hlgt hlgt--green">hlgt--green</li>
          <li className="hlgt hlgt--blue">hlgt--blue</li>
        </ul>
      </div>
    );
  }
}

export default Palette;

Palette.propTypes = {

};
