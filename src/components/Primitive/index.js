import React from 'react';
import PropTypes from 'prop-types';

import {primitivesAttrs} from '../Data';

const Primitive = ({primitive}) => {
  const groupData = primitivesAttrs[primitive.groupName];
  const paramsKeys = Object.keys(primitive.params);
  const params = paramsKeys.reduce((prev, param) => {
    let {value, disabled} = primitive.params[param];

    if (disabled) {
      return prev;
    }

    prev[param] = value;

    return prev;
  }, {});

  return (
    <groupData.name {...params}>
      {primitive.children}
    </groupData.name>
  );
};

export default Primitive;

Primitive.propTypes = {
  primitive: PropTypes.object.isRequired
};
