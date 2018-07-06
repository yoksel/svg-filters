import React, {Component} from 'react';

import InputText from '../../containers/InputText';
import InputSelect from '../../containers/InputSelect';
import PrimitivePanelControls from '../../containers/PrimitivePanelControls';

import {primitivesAttrs} from '../Data';

import './PrimitivePanel.css';

class PrimitivePanel extends Component {
  render() {
    const primitive = this.props.primitive;
    const paramsValues = primitive.paramsValues;
    let resultsList = Array.from(this.props.resultsList);

    const getResultAttr = (resultId) => {
      return (
        <span key="result" className="PrimitivePanel__result">
        result="<span className='PrimitivePanel__result-name'>
            {resultId}
          </span>"
        </span>
      );
    };

    const params = Object.keys(primitive.params).map((key, index) => {
      const param = primitive.params[key];
      const value = param.value;

      if (key === 'result') {
        return getResultAttr(param);
      }

      // Default types text/number
      let input = <InputText
        id={primitive.id}
        param={key}
        value={value}
        type={param.type}
      />;

      // Select
      if (param.type === 'select') {
        let valuesList = paramsValues && paramsValues[key];

        if (!valuesList) {
          valuesList = primitivesAttrs[key];
        }

        if (key === 'in') {
          valuesList = valuesList.concat(resultsList);
        }

        input = <InputSelect
          id={primitive.id}
          param={key}
          value={value}
          valuesList={valuesList}
          onChange={this.props.onChange}
        />;
      }

      return (
        <label
          key={key}
          className="PrimitivePanel__label"
        >{key}={input}</label>
      );
    });

    return (
      <div
        className="PrimitivePanel"
      >&lt;{primitive.name}{params}&#8203;/>
        <PrimitivePanelControls
          id={primitive.id}
        />
      </div>
    );
  }
}

export default PrimitivePanel;
