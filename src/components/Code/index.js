import React, {Component} from 'react';

import deepClone from '../../helpers/deepClone';

import {primitivesAttrs} from '../Data';

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

class Code extends Component {
  render() {
    const {primitives} = this.props;
    const primitivesCode = getAllPrimitivesCode(primitives).join('\n');

    if (process.env.NODE_ENV !== 'production') {
      // Temporary for extracting good presets
      console.groupCollapsed('Filter code');
      console.log(JSON.stringify(primitives, null, '\t'));
      console.groupEnd('Filter code');
    }

    const value = primitivesCode ?
      `<filter id="filter">\n${primitivesCode}\n</filter>` :
      '';

    return (
      <div className="Code">
        <textarea
          className="Code__textarea"
          value={value}
          onChange={() => {}}
        />
      </div>
    );
  }
}

export default Code;
