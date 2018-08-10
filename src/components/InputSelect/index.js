import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './InputSelect.css';

class InputSelect extends Component {
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
    const {value, valuesList} = this.props;

    const options = valuesList.map((item, index) =>{
      return React.createElement('option', {
        value: item,
        key: index,
      }, item);
    });

    return React.createElement('select', {
      onChange: this.onChange,
      value: value,
      className: 'InputSelect'
    }, options);
  }
}

export default InputSelect;

InputSelect.propTypes = {
  value: PropTypes.string,
  valuesList: PropTypes.array,
  onChange: PropTypes.func
};
