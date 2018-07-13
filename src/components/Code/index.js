import React, {Component} from 'react';

import deepClone from '../../helpers/deepClone';

import './Code.css';

const getPrimitiveCode = (primitive, level = 1) => {
  const paramsKeys = Object.keys(primitive.params);
  const prefix = level === 2 ? '\t\t' : '\t';

  const params = paramsKeys.reduce((prev, paramName) => {
    const param = primitive.params[paramName];
    let value = param.value;

    if (param.name) {
      paramName = param.name;
    }

    prev.push(`${paramName}="${value}"`);

    return prev;
  }, []);

  if (primitive.children) {
    return `${prefix}<${primitive.name} ${params.join(' ')}>
    ${primitive.children.join('\n')}
  ${prefix}</${primitive.name}>`;
  }

  return `${prefix}<${primitive.name} ${params.join(' ')}/>`;
};

const getAllPrimitivesCode = (primitives) => {
  return primitives.map(primitive => {
    primitive = deepClone(primitive);

    if (primitive.children) {
      primitive.children = primitive.children.map(item => {

        return getPrimitiveCode(item, 2);
      });
    }

    return getPrimitiveCode(primitive);
  });
};

class Code extends Component {
  render() {
    const {primitives} = this.props;
    const primitivesCode = getAllPrimitivesCode(primitives).join('\n');

    // Temporary for extracting good presets
    console.log(JSON.stringify(primitives, null, '\t'));

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
