import React, { Component, Fragment } from 'react';
import './InputText.css';

class InputText extends Component {
  constructor(){
    super();

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange({
      primitiveName: this.props.primitiveName,
      param: this.props.param,
      value: event.target.value
    });
  }

  render() {
    let inputType = this.props.type;

    const input = React.createElement('input', {
      defaultValue: this.props.value,
      type: inputType,
      onChange: this.onChange,
      className: 'InputText'
    });

    return (
        <Fragment>{input}</Fragment>
    );
  }
}

export default InputText;
