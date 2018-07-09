import React from 'react';

const Primitive = ({primitive}) => {
  const paramsKeys = Object.keys(primitive.params);
  const params = paramsKeys.reduce((prev, param) => {
    let value = primitive.params[param].value;

    prev[param] = value;

    return prev;
  }, {});

  return (
    <primitive.name {...params}>
      {primitive.children}
    </primitive.name>
  );
};

export default Primitive;
