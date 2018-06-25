import React, { Component } from 'react';
import './Icon.css';

class Icon extends Component {
  render() {
    const {symbol, color, size} = this.props;

    return (
        <svg className={`icon icon-${symbol}`} fill={color} width={size} height={size}>
            <use xlinkHref={`#icon-${symbol}`} />
          </svg>
    );
  }
}

export default Icon;
