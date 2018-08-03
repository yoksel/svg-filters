import React, {Component} from 'react';

import InputTextarea from '../../containers/InputTextarea';

class PrimitivePanelInputTextarea extends Component {
  render() {
    const {primitive, paramKey} = this.props;

    const param = primitive.params[paramKey];
    const {value, type} = param;
    let input;

    let actualValue = value;

    if (!actualValue) {
      actualValue = '';
    }

    input = <InputTextarea
      id={primitive.id}
      key={primitive.id}
      param={paramKey}
      value={actualValue}
      type={type}
    />;

    return input;
  }
}

export default PrimitivePanelInputTextarea;
