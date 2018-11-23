import React, {Component} from 'react';

import InputSelect from '../../containers/PrimitivePanelInputSelect';
import {primitivesAttrs} from '../Data';

class PrimitivePanelInputSelect extends Component {
  render() {
    const {primitive, paramKey, resultsList, parentId} = this.props;

    const param = primitive.params[paramKey];
    const {value} = param;
    const values = primitive.params.values;
    let input;
    let input2;

    let actualValue = value;
    let secondValue = 0;

    const {groupName} = primitive;

    let secondOptionsList = [];
    let tiedValues = {};
    let tiedTypes = {};
    const groupData = primitivesAttrs[groupName];
    const {inputsData} = groupData;
    const {double, valuesKeys, dependencies} = inputsData[paramKey];
    let actualOptionsList = groupData[paramKey];

    if (paramKey === 'in' || paramKey === 'in2') {
      actualOptionsList = primitivesAttrs[paramKey];
      actualOptionsList = actualOptionsList.concat(resultsList);
    }

    if (double) {
      let valuesList = value.split(' ');
      actualValue = valuesList[0];
      secondValue = valuesList[1];

      if (valuesKeys && valuesKeys.length === 2) {
        actualOptionsList = groupData[valuesKeys[0]];
        secondOptionsList = groupData[valuesKeys[1]];
      }
    }

    if (inputsData.values) {
      tiedValues = inputsData.values.variants.values;
      tiedTypes = inputsData.values.variants.types;

      if (values.variants) {
        tiedValues = {
          ...tiedValues,
          ...values.variants.values
        };
      }
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
      dependencies={dependencies}
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
        dependencies={dependencies}
      />;
    }

    return [input, input2];
  }
}

export default PrimitivePanelInputSelect;
