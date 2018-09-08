import React, {Component} from 'react';
import PropTypes from 'prop-types';

import deepClone from '../../helpers/deepClone';

import {primitivesAttrs} from '../Data';

import ColorInterpolFiltersSwitcher from '../../containers/ColorInterpolFiltersSwitcher';

import './Code.css';

const getPrimitiveCode = (primitive, level = 1) => {
  const groupData = primitivesAttrs[primitive.groupName];
  const paramsKeys = Object.keys(primitive.params);
  const prefix = level === 2 ? '\t\t' : '\t';
  const primitiveName = groupData.name;

  const params = paramsKeys.reduce((prev, paramName) => {
    const param = primitive.params[paramName];
    const inputData = groupData.inputsData && groupData.inputsData[paramName];
    let {value, disabled} = param;

    if (disabled) {
      return prev;
    }

    if (inputData && inputData.name) {
      paramName = inputData.name;
    }

    prev.push(`${paramName}="${value}"`);

    return prev;
  }, []);

  if (primitive.children) {
    return `${prefix}<${primitiveName} ${params.join(' ')}>
    ${primitive.children.join('\n')}
  ${prefix}</${primitiveName}>`;
  }

  return `${prefix}<${primitiveName} ${params.join(' ')}/>`;
};

const getAllPrimitivesCode = (primitives) => {
  return primitives
    .filter(primitive => !primitive.disabled)
    .map(primitive => {
      primitive = deepClone(primitive);

      if (primitive.children) {
        primitive.children = primitive.children
          .filter(child => !child.disabled)
          .map(child => {

            return getPrimitiveCode(child, 2);
          });
      }

      return getPrimitiveCode(primitive);
    });
};

const getValueFromObject = (valueObj) => {
  const valueList = Object.keys(valueObj).reduce((prev, valueKey) => {
    prev.push(`${valueKey}: ${valueObj[valueKey]}`);

    return prev;
  }, []);

  return valueList.join(';');
};

const getFilterAttrs = (filterData) => {
  if (filterData.style) {
    delete filterData.style;
  }

  const attrsList = Object.keys(filterData).reduce((prev, attrName) => {
    let value = filterData[attrName];
    if (typeof value === 'object') {
      value = getValueFromObject(value);
    }
    if (attrName === 'colorInterpolationFilters') {
      attrName = 'color-interpolation-filters';
    }

    prev.push(`${attrName}="${value}"`);

    return prev;
  }, []);

  return attrsList.join(' ');
};

class Code extends Component {
  render() {
    const filterData = this.props.filterData;
    const filterAttrs = getFilterAttrs(filterData);

    const {primitives} = this.props;
    const primitivesCode = getAllPrimitivesCode(primitives).join('\n');

    if (process.env.NODE_ENV !== 'production') {
      // Temporary for extracting good presets
      console.groupCollapsed('Filter code');
      console.log(JSON.stringify(primitives, null, '\t'));
      console.groupEnd('Filter code');
    }

    const value = primitivesCode ?
      `<filter id="filter" ${filterAttrs}>\n${primitivesCode}\n</filter>` :
      '';

    return (
      <section className="Code">
        <h2 className="visuallyhidden">Filter code</h2>
        <ColorInterpolFiltersSwitcher/>
        <textarea
          className="Code__textarea"
          value={value}
          onChange={() => {}}
          spellCheck="false"
        />
      </section>
    );
  }
}

export default Code;

Code.propTypes = {
  filterData: PropTypes.object,
  primitives: PropTypes.array
};
