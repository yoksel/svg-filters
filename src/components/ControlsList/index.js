import React from 'react';
import PropTypes from 'prop-types';

import './ControlsList.css';

const ControlsList = ({items, onClick}) => {
  return (
    <div className="ControlsList">
      {items.map((preset, index) => {
        return (
          <button
            className="Control"
            key={preset.id}
            onClick={() => {
              onClick(preset);
            }}
          >
            {preset.name}
          </button>
        );
      })}
    </div>
  );
};

export default ControlsList;

ControlsList.propTypes = {
  items: PropTypes.array
};
