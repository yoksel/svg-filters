import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import PrimitivePanelSwitcher from '../PrimitivePanelSwitcher';

import './PrimitivePanelControls.css';

const PrimitivePanelControls = ({
  duplicatePrimitive,
  removePrimitive,
  togglePrimitive,
  primitiveDisabled,
  toggleDocs,
  hasResult,
  section,
  id,
  parentId,
  groupName,
  parentHasSingleChild
}) => {
  const panelClassList = [
    'PrimitivePanelControls'
  ];
  let showDocs = true;

  if (groupName === 'mergeNode' || section === 'docs') {
    showDocs = false;
  }

  if (!hasResult) {
    panelClassList.push('PrimitivePanelControls--no-result');
  }

  const getDocsButton = () => {
    if (!showDocs) {
      return;
    }

    return (
      <button
        className="PrimitivePanelControl PrimitivePanelControl--docs"
        type="button"
        onClick={toggleDocs}
      >
        <Icon
          symbol="doc"
          color="currentColor"
          size="15"/>
      </button>
    );
  };

  if (parentHasSingleChild) {
    return (
      <div className={panelClassList.join(' ')}>
        <PrimitivePanelSwitcher
          id={id}
          parentId={parentId}
          primitiveDisabled={primitiveDisabled}
        />
        {getDocsButton()}
      </div>
    );
  }

  // Hide toggle, duplicate, delete controls in docs
  if (section === 'docs') {
    return null;
  }

  return (
    <div className={panelClassList.join(' ')}>
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

      {getDocsButton()}
    </div>
  );
};

export default PrimitivePanelControls;

PrimitivePanelControls.propTypes = {
  duplicatePrimitive: PropTypes.func,
  removePrimitive: PropTypes.func
};
