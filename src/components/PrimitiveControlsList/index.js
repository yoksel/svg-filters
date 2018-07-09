import React from 'react';
import PropTypes from 'prop-types';

import './PrimitiveControlsList.css';

const PrimitiveControlsList = ({primitiveControls, onClick}) => {
  return (
    <div className="PrimitiveControlsList">
      <div>
        {primitiveControls.map((primitive, index) => {
          return (
            <div
              key={primitive.id}
              className="PrimitiveControlsList__item"
              onClick={() => {
                onClick(primitive);
              }}
            >
              {primitive.name}
            </div>
          );
        })}

      </div>

    </div>
  );
};

export default PrimitiveControlsList;

PrimitiveControlsList.propTypes = {
  primitiveControls: PropTypes.array
};
