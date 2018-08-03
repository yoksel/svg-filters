import React, {Component} from 'react';

import InputSelect from '../../containers/InputSelect';
import {primitivesAttrs} from '../Data';

class PrimitivePanelInputSelect extends Component {
  render() {
    const {primitive, paramKey, resultsList, parentId} = this.props;

    const param = primitive.params[paramKey];
    const {value} = param;
    let input;

    const paramsValues = primitive.paramsValues;
    let valuesList = paramsValues && paramsValues[paramKey];
    let valuesKey = param.valuesKey || paramKey;
    let tiedValues = {};
    let tiedTypes = {};

    if (!valuesList) {
      valuesList = primitivesAttrs[valuesKey];
    }

    if (valuesKey === 'in') {
      valuesList = valuesList.concat(resultsList);
    }

    if (primitive.params.values) {
      tiedValues = primitive.params.values.variants.values;
      tiedTypes = primitive.params.values.variants.types;
    }

    input = <InputSelect
      id={primitive.id}
      key={primitive.id}
      param={paramKey}
      value={value}
      valuesList={valuesList}
      parentId={parentId}
      tiedValues={tiedValues}
      tiedTypes={tiedTypes}
    />;

    return input;
  }
}

export default PrimitivePanelInputSelect;
