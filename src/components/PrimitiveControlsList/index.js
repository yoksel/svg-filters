import React from 'react';
import PropTypes from 'prop-types';

import PrimitiveControl from '../PrimitiveControl';

import './PrimitiveControlsList.css';

const PrimitiveControlsList = ({primitiveControls, onClick}) => {
  return (
    <div className="PrimitiveControlsList">
      {primitiveControls.map((primitive, index) => {
        return (
          <PrimitiveControl
            key={primitive.id}
            onClick={() => {
              onClick(primitive);
            }}
          >
            {primitive.name}
          </PrimitiveControl>
        );
      })}
    </div>
  );
};

export default PrimitiveControlsList;

PrimitiveControlsList.propTypes = {
  primitiveControls: PropTypes.array
};
