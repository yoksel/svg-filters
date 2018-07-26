import React from 'react';

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
