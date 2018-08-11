import React, {Component} from 'react';

import InputSelect from '../../containers/InputSelect';
import {primitivesAttrs} from '../Data';

class PrimitivePanelInputSelect extends Component {
  render() {
    const {primitive, paramKey, resultsList, parentId} = this.props;

    const param = primitive.params[paramKey];
    const {value, double} = param;
    let input;
    let input2;

    let actualValue = value;
    let secondValue = 0;

    const {paramsValues, groupName} = primitive;
    let actualOptionsList = paramsValues && paramsValues[paramKey];
    let secondOptionsList = [];
    const valuesKeys = param.valuesKeys;
    let tiedValues = {};
    let tiedTypes = {};
    const optionsForGroup = primitivesAttrs[groupName];

    if (!actualOptionsList) {
      if (optionsForGroup && optionsForGroup[paramKey]) {
        actualOptionsList = optionsForGroup[paramKey];
      } else {
        actualOptionsList = primitivesAttrs[paramKey];
      }
    }

    if (paramKey === 'in' || paramKey === 'in2') {
      actualOptionsList = actualOptionsList.concat(resultsList);
    }

    if (double) {
      let valuesList = value.split(' ');
      actualValue = valuesList[0];
      secondValue = valuesList[1];

      if (valuesKeys && valuesKeys.length === 2) {
        actualOptionsList = optionsForGroup[valuesKeys[0]];
        secondOptionsList = optionsForGroup[valuesKeys[1]];
      }
    }

    if (primitive.params.values) {
      tiedValues = primitive.params.values.variants.values;
      tiedTypes = primitive.params.values.variants.types;
    }

    input = <InputSelect
      id={primitive.id}
      key={primitive.id}
      param={paramKey}
      value={actualValue}
      secondValue={secondValue}
      valuesList={actualOptionsList}
      parentId={parentId}
      tiedValues={tiedValues}
      tiedTypes={tiedTypes}
    />;

    if (double && secondOptionsList.length > 0) {
      input2 = <InputSelect
        id={primitive.id}
        key={primitive.id+1}
        param={paramKey}
        value={secondValue}
        firstValue={actualValue}
        valuesList={secondOptionsList}
        parentId={parentId}
        tiedValues={tiedValues}
        tiedTypes={tiedTypes}
      />;
    }

    return [input, input2];
  }
}

export default PrimitivePanelInputSelect;
