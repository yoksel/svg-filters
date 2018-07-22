import React, {Component} from 'react';
import PropTypes from 'prop-types';

import InputText from '../../containers/InputText';
import InputSelect from '../../containers/InputSelect';
import {primitivesAttrs} from '../Data';

import './PrimitivePanelInput.css';

class PrimitivePanelInput extends Component {
  render() {
    const {primitive, paramKey, resultsList, parentId} = this.props;

    const key = paramKey;
    const paramsValues = primitive.paramsValues;
    const param = primitive.params[key];
    const {value, step, min, max, variants, double} = param;
    let input;
    let input2;

    if (param.type !== 'select') {
      // Default types text/number/color
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
        input = null;
        return null;
      }

      if (double) {
        valuesList = value.split(' ');
        actualValue = valuesList[0];
        secondValue = valuesList[1];
      }

      input = <InputText
        id={primitive.id}
        key={primitive.id}
        param={key}
        value={actualValue}
        secondValue={secondValue}
        step={step}
        min={min}
        max={max}
        type={param.type}
      />;

      if (double) {
        input2 = <InputText
          id={primitive.id}
          key={primitive.id+1}
          param={key}
          value={secondValue}
          firstValue={actualValue}
          step={step}
          min={min}
          max={max}
          type={param.type}
        />;
      }

    } else {
      // Select

      let valuesList = paramsValues && paramsValues[key];
      let valuesKey = param.valuesKey || key;

      if (!valuesList) {
        valuesList = primitivesAttrs[valuesKey];
      }

      if (valuesKey === 'in') {
        valuesList = valuesList.concat(resultsList);
      }

      input = <InputSelect
        id={primitive.id}
        key={primitive.id}
        param={key}
        value={value}
        valuesList={valuesList}
        parentId={parentId}
      />;
    }

    return [input, input2];
  }
}

export default PrimitivePanelInput;

PrimitivePanelInput.propTypes = {
  primitive: PropTypes.object,
  paramKey: PropTypes.string,
  resultsList: PropTypes.array,
  parentId: PropTypes.string
};
