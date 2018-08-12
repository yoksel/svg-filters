import React, {Component} from 'react';

import {primitivesAttrs} from '../Data';

import InputText from '../../containers/InputText';

class PrimitivePanelInputText extends Component {
  render() {
    const {primitive, paramKey} = this.props;

    const param = primitive.params[paramKey];
    const {value} = param;
    const optionsForGroup = primitivesAttrs[primitive.groupName];
    const {step, min, max, double, type} = optionsForGroup.inputsData[paramKey];
    let input;
    let input2;

    let actualValue = value;
    let valuesList = [];
    let secondValue = 0;

    if (!actualValue) {
      actualValue = '';
    }

    if (double) {
      valuesList = value.split(' ');
      actualValue = valuesList[0];
      secondValue = valuesList[1];
    }

    input = <InputText
      id={primitive.id}
      key={primitive.id}
      param={paramKey}
      value={actualValue}
      secondValue={secondValue}
      step={step}
      min={min}
      max={max}
      type={type}
    />;

    if (double) {
      input2 = <InputText
        id={primitive.id}
        key={primitive.id+1}
        param={paramKey}
        value={secondValue}
        firstValue={actualValue}
        step={step}
        min={min}
        max={max}
        type={type}
      />;
    }

    return [input, input2];
  }
}

export default PrimitivePanelInputText;
