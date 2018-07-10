import React from 'react';
import PropTypes from 'prop-types';

import InputText from '../../containers/InputText';
import InputSelect from '../../containers/InputSelect';
import PrimitivePanelControls from '../../containers/PrimitivePanelControls';

import ResultAttribute from '../ResultAttribute';
import {primitivesAttrs} from '../Data';

import './PrimitivePanel.css';

const PrimitivePanel = ({primitive, parent, onChange, resultsList}) => {
  const paramsValues = primitive.paramsValues;
  resultsList = Array.from(resultsList);

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

  if (!primitive.children) {
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
  }

  return (
    <div
      className="PrimitivePanel"
    >&lt;{primitive.name}{params}&#8203;>
      <PrimitivePanelControls
        id={primitive.id}
      />
      {primitive.children}
      &lt;/{primitive.name}&#8203;>
    </div>
  );
};

export default PrimitivePanel;

PrimitivePanel.propTypes = {
  primitive: PropTypes.object,
  parent: PropTypes.string,
  onChange: PropTypes.func
};
