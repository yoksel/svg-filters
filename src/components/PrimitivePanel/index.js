import React from 'react';
import PropTypes from 'prop-types';

import InputText from '../../containers/InputText';
import InputSelect from '../../containers/InputSelect';
import PrimitivePanelControls from '../../containers/PrimitivePanelControls';

import ResultAttribute from '../ResultAttribute';
import {primitivesAttrs} from '../Data';

import './PrimitivePanel.css';

const PrimitivePanel = ({primitive, parentId, onChange, resultsList}) => {
  const paramsValues = primitive.paramsValues;
  resultsList = Array.from(resultsList);

  const params = Object.keys(primitive.params).map((key, index) => {
    const param = primitive.params[key];
    const {value, step, min, max, variants, double} = param;
    let input;
    let input2;

    if (key === 'result') {
      return (
        <ResultAttribute
          key={value}
          value={value} />
      );
    }

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
        return;
      }

      if (double) {
        valuesList = value.split(' ');
        actualValue = valuesList[0];
        secondValue = valuesList[1];
      }

      input = <InputText
        id={primitive.id}
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
        param={key}
        value={value}
        valuesList={valuesList}
        parentId={parentId}
        onChange={onChange}
      />;
    }

    return (
      <label
        key={key}
        className="PrimitivePanel__label"
      >{key}={input}{input2}</label>
    );
  });

  if (!primitive.children) {
    return (
      <div className="PrimitivePanel">
        &lt;{primitive.name}{params}&#8203;/>

        <PrimitivePanelControls
          id={primitive.id}
          parentId={parentId}
        />
        {primitive.children}
      </div>
    );
  }

  return (
    <div className="PrimitivePanel PrimitivePanel--has-children">
      <div className="PrimitivePanel__tag">
        &lt;{primitive.name}{params}&#8203;>
      </div>
      <PrimitivePanelControls
        id={primitive.id}
      />
      {primitive.children}
      <div className="PrimitivePanel__tag">
        &lt;/{primitive.name}&#8203;>
      </div>
    </div>
  );
};

export default PrimitivePanel;

PrimitivePanel.propTypes = {
  primitive: PropTypes.object,
  parentId: PropTypes.string,
  onChange: PropTypes.func
};
