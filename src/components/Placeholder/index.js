import React from 'react';
import PropTypes from 'prop-types';

import './Placeholder.css';

const Placeholder = ({elemClientRect, isDragging}) => {
  if (!isDragging) {
    return null;
  }

  return (
    <div
      className="Placeholder"
      style={{height: elemClientRect.height}}
    ></div>
  );
};

export default Placeholder;

Placeholder.propTypes = {
  elemClientRect: PropTypes.object,
  isDragging: PropTypes.bool
};
