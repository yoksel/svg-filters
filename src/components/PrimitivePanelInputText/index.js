import React, {Component} from 'react';

import InputText from '../../containers/InputText';

import './PrimitivePanelInputText.css';

class PrimitivePanelInputText extends Component {
  render() {
    const {primitive, paramKey} = this.props;

    const param = primitive.params[paramKey];
    const {value, step, min, max, variants, double, type} = param;
    let input;
    let input2;

    let actualValue = value;
    let valuesList = [];
    let secondValue = 0;

    if (variants) {
      const propByKey = primitive.params[variants.key];

      if (propByKey) {
        const keyValue = propByKey.value;
        actualValue = variants.values[keyValue];
      }
    }

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
