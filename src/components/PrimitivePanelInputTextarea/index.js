import React, {Component} from 'react';

import InputTextarea from '../../containers/PrimitivePanelInputTextarea';

class PrimitivePanelInputTextarea extends Component {
  render() {
    const {primitive, paramKey, parentId} = this.props;

    const param = primitive.params[paramKey];
    const {value, type} = param;
    let input;

    let actualValue = value;

    if (!actualValue) {
      actualValue = '';
    }

    input = <InputTextarea
      id={primitive.id}
      parentId={parentId}
      key={primitive.id}
      param={paramKey}
      value={actualValue}
      type={type}
    />;

    return input;
  }
}

export default PrimitivePanelInputTextarea;
