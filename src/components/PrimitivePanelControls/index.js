import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './PrimitivePanelControls.css';

const PrimitivePanelControls = ({
  duplicatePrimitive,
  removePrimitive,
  togglePrimitive,
  primitiveDisabled
}) => {
  return (
    <div className="PrimitivePanelControls">

      <button
        className="PrimitivePanelControl PrimitivePanelControl--toggle"
        onClick={togglePrimitive}
        type="button"
      >
        <Icon
          symbol={primitiveDisabled ? 'eye' : 'eye-blocked'}
          color="currentColor"
          size="16"/>
      </button>
      <button
        className="PrimitivePanelControl PrimitivePanelControl--add"
        onClick={duplicatePrimitive}
        type="button"
      >
        <Icon
          symbol="plus"
          color="currentColor"
          size="14"/>
      </button>
      <button
        className="PrimitivePanelControl PrimitivePanelControl--remove"
        type="button"
        onClick={removePrimitive}
      >
        <Icon
          symbol="cross"
          color="currentColor"
          size="13"/>
      </button>
    </div>
  );
};

export default PrimitivePanelControls;

PrimitivePanelControls.propTypes = {
  duplicatePrimitive: PropTypes.func,
  removePrimitive: PropTypes.func
};
