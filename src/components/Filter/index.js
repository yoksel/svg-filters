import React from 'react';

import Primitive from '../Primitive';

const Filter = ({primitives}) => (
  <filter id="filter">
    {primitives.map(primitive => (
      <Primitive
        key={primitive.params.result}
        primitive={primitive}/>
    ))}
  </filter>
);

export default Filter;
