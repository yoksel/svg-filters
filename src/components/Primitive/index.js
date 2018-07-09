import React from 'react';
import PropTypes from 'prop-types';

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

Primitive.propTypes = {
  primitive: PropTypes.object.isRequired,
  children: PropTypes.array
};
