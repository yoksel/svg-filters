import React, {Component} from 'react';
import './InputText.css';

class InputText extends Component {
  onChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    let inputType = this.props.type;

    return React.createElement('input', {
      defaultValue: this.props.value,
      type: inputType,
      onChange: this.onChange,
      className: 'InputText'
    });
  }
}

export default InputText;
