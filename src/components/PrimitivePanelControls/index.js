import React from 'react';
import PropTypes from 'prop-types';

import {docsData} from '../Data';

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
  parentHasSingleChild,
  noChangesForChildren
}) => {
  const panelClassList = [
    'PrimitivePanelControls'
  ];
  let showDocs = true;

  if (!docsData[groupName] || section === 'docs') {
    showDocs = false;
  }

  if (!hasResult) {
    panelClassList.push('PrimitivePanelControls--no-result');
  }
  if (parentHasSingleChild) {
    panelClassList.push('PrimitivePanelControls--parentHasSingleChild');
  }

  const getDocsButton = () => {
    if (!showDocs) {
      return null;
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

  // Hide toggle, duplicate, delete controls for componentTransfer
  if (noChangesForChildren) {
    return (
      <div className={panelClassList.join(' ')}>
        {getDocsButton()}
      </div>
    );
  }

  return (
    <div className={panelClassList.join(' ')}>
      {getDocsButton()}

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
