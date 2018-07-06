import React, {Component} from 'react';
import './InputSelect.css';

class InputSelect extends Component {
  onChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    const value = this.props.value;
    let valuesList = this.props.valuesList;

    const options = valuesList.map((item, index) =>{
      return React.createElement('option', {
        value: item,
        key: index,
      }, item);
    });

    return React.createElement('select', {
      onChange: this.onChange,
      defaultValue: value,
      className: 'InputSelect'
    }, options);
  }
}

export default InputSelect;
