import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Icon.css';

class Icon extends Component {
  render() {
    const {symbol, color = 'currentColor', size} = this.props;

    return (
      <svg className={`icon icon-${symbol}`} fill={color} width={size} height={size}>
        <use xlinkHref={`#icon-${symbol}`} />
      </svg>
    );
  }
}

export default Icon;

Icon.propTypes = {
  symbol: PropTypes.oneOf(['doc', 'eye', 'eye-blocked', 'plus', 'cross']),
  color: PropTypes.string,
  size: PropTypes.string,
};
