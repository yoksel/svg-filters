import React from 'react';
import PropTypes from 'prop-types';

import './PrimitiveControl.css';

const PrimitiveControl = ({onClick, children}) => {
  return (
    <button
      className="PrimitiveControl"
      onClick={onClick}
    >{children}</button>
  );
};

export default PrimitiveControl;

PrimitiveControl.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string
};

