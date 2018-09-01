import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './ConstructorPlaceholder.css';

class ConstructorPlaceholder extends Component {
  text = {
    playground: 'Drag primitives here to create filter',
    presets: 'Choose a preset to play with its primitives',
    docs: 'Choose primitive to see docs and live demos'
  };

  render() {
    const {section = 'playground'} = this.props;

    return (
      <div
        className="ConstructorPlaceholder"
        dangerouslySetInnerHTML={{__html: this.text[section]}}>
      </div>
    );
  }
}

export default ConstructorPlaceholder;

ConstructorPlaceholder.propTypes = {
  section: PropTypes.string
};
