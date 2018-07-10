import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './InputSelect.css';

class InputSelect extends Component {
  onChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    const {value, valuesList, lastResult} = this.props;

    const options = valuesList.map((item, index) =>{
      return React.createElement('option', {
        value: item,
        key: index,
      }, item);
    });

    return React.createElement('select', {
      onChange: this.onChange,
      defaultValue: lastResult || value,
      className: 'InputSelect'
    }, options);
  }
}

export default InputSelect;

InputSelect.propTypes = {
  value: PropTypes.string,
  valuesList: PropTypes.array,
  lastResult: PropTypes.string,
  onChange: PropTypes.func
};
