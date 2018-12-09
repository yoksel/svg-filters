import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './InputTextarea.css';

class InputTextarea extends Component {
  onChange = (event) => {
    let value = event.target.value;
    const {secondValue, firstValue} = this.props;

    if (secondValue) {
      value = `${value} ${secondValue}`;
    } else if (firstValue) {
      value = `${firstValue} ${value}`;
    }
    this.props.onChange(value);
  }

  render() {
    let {value, className = ''} = this.props;

    return React.createElement('textarea', {
      value: value,
      onChange: this.onChange,
      spellCheck: false,
      className: `InputTextarea ${className}`
    });
  }
}

export default InputTextarea;

InputTextarea.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func
};
