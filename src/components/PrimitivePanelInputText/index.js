import React, {Component} from 'react';

import {primitivesAttrs} from '../Data';

import InputTextContainer from '../../containers/PrimitivePanelInputText';

class PrimitivePanelInputText extends Component {
  render() {
    const {primitive, paramKey, parentId} = this.props;

    const param = primitive.params[paramKey];
    const {value} = param;
    const groupData = primitivesAttrs[primitive.groupName];
    const {step, min, max, double, type} = groupData.inputsData[paramKey];
    let input;
    let input2;

    let actualValue = value;
    let valuesList = [];
    let secondValue = 0;

    if (!actualValue) {
      if (type === 'text') {
        actualValue = '';
      } else {
        actualValue = 0;
      }
    }

    if (double) {
      valuesList = value.split(' ');
      actualValue = valuesList[0];
      secondValue = valuesList[1];
    }

    input = <InputTextContainer
      id={primitive.id}
      key={primitive.id}
      param={paramKey}
      value={actualValue}
      secondValue={secondValue}
      step={step}
      min={min}
      max={max}
      type={type}
      parentId={parentId}
    />;

    if (double) {
      input2 = <InputTextContainer
        id={primitive.id}
        key={primitive.id+1}
        param={paramKey}
        value={secondValue}
        firstValue={actualValue}
        step={step}
        min={min}
        max={max}
        type={type}
        parentId={parentId}
      />;
    }

    return [input, input2];
  }
}

export default PrimitivePanelInputText;
