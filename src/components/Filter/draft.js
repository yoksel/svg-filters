import React, {Component} from 'react';

function getPrimitives() {
  const primitives = this.props.primitives;
  const divider = '\n\t\t';
  const isCode = this.props.code;

  return primitives.map((primitive, index) => {
    const paramsKeys = Object.keys(primitive.params);
    const params = paramsKeys.reduce((prev, param) => {
      let value = primitive.params[param].value;

      if (param === 'result') {
        value = primitive.params[param];
      }

      prev.obj[param] = value;
      prev.list.push(`${param}="${value}"`);

      return prev;
    }, {obj: {}, list: []});

    if (isCode) {
      return `<${primitive.name}${divider}${params.list.join(divider)}/>`;
    }

    return (
      <primitive.name key={index} {...params.obj}/>
    );
  });
}


function getCode() {
  return `<filter id="filter">
\t${this.getPrimitives().join('\n\t')}
</filter>`;
}


