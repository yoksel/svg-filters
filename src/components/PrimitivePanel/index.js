import React from 'react';

import InputText from '../../containers/InputText';
import InputSelect from '../../containers/InputSelect';
import PrimitivePanelControls from '../../containers/PrimitivePanelControls';

import ResultAttribute from '../ResultAttribute';
import {primitivesAttrs} from '../Data';

import './PrimitivePanel.css';

const PrimitivePanel = ({primitive, parent, onChange}) => {
  const paramsValues = primitive.paramsValues;
  let resultsList = Array.from(this.props.resultsList);

  const params = Object.keys(primitive.params).map((key, index) => {
    const param = primitive.params[key];
    const value = param.value;

    if (key === 'result') {
      return (
        <ResultAttribute
          key={value}
          value={value} />
      );
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
      let valuesKey = param.valuesKey || key;
      let lastResult = '';

      if (!valuesList) {
        valuesList = primitivesAttrs[valuesKey];
      }

      if (valuesKey === 'in') {
        valuesList = valuesList.concat(resultsList);
        lastResult = resultsList[resultsList.length - 1];
      }

      input = <InputSelect
        id={primitive.id}
        param={key}
        value={value}
        valuesList={valuesList}
        lastResult={lastResult}
        parentId={parent}
        onChange={onChange}
      />;
    }

    return (
      <label
        key={key}
        className="PrimitivePanel__label"
      >{key}={input}</label>
    );
  });

  let primitiveText = {
    start: `&amp;lt;${primitive.name}${params}&amp;#8203;>`,
    end: `&amp;lt;/${primitive.name}${params}>`
  };

  if (!primitive.children) {
    primitiveText = {
      start: primitiveText.start.replace('>', '/>'),
      end: null
    };
  }

  return (
    <div
      className="PrimitivePanel"
    >&lt;{primitive.name}{params}&#8203;/>
      <PrimitivePanelControls
        id={primitive.id}
      />
      {primitive.children}
    </div>
  );
};

export default PrimitivePanel;
