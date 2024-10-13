import clsx from 'clsx';
import { docsData } from '../../data';

import Icon from '../atoms/Icon';
import PrimitivePanelSwitcher from '../PrimitivePanelSwitcher';
import { Section } from '../../store/types';

import './PrimitivePanelControls.scss';

export interface PrimitivePanelControlsProps {
  section: Section;
  childId?: string;
  parentId?: string;
  groupName: string;
  hasResult?: boolean;
  hasChildrenMod?: string;
  parentHasSingleChild?: boolean;
  primitiveDisabled?: boolean;
  noChangesForChildren?: boolean;
  duplicatePrimitive: () => void;
  removePrimitive: () => void;
  togglePrimitive: () => void;
  toggleDocs: () => void;
}

const PrimitivePanelControls = ({
  duplicatePrimitive,
  removePrimitive,
  togglePrimitive,
  primitiveDisabled,
  toggleDocs,
  hasResult,
  section,
  childId,
  parentId,
  groupName,
  hasChildrenMod,
  parentHasSingleChild,
  noChangesForChildren,
}: PrimitivePanelControlsProps) => {
  const panelClassList = clsx(
    'PrimitivePanelControls',
    `PrimitivePanelControls--${hasChildrenMod}`,
    !hasResult && 'PrimitivePanelControls--no-result',
    parentHasSingleChild && 'PrimitivePanelControls--parentHasSingleChild',
  );
  const showDocs = !docsData[groupName] || section === 'docs' ? false : true;

  const DocsButton = () => (
    <button
      className="PrimitivePanelControl PrimitivePanelControl--docs"
      type="button"
      onClick={toggleDocs}
      title="Show documentation for this primitive"
    >
      <Icon symbol="doc" color="currentColor" size="15" />
    </button>
  );

  if (parentHasSingleChild && parentId && childId) {
    // Choice of lightning source in feSpecularLighting
    return (
      <div className={panelClassList}>
        <PrimitivePanelSwitcher
          parentId={parentId}
          childId={childId}
          primitiveDisabled={primitiveDisabled}
        />
        {showDocs && <DocsButton />}
      </div>
    );
  }

  // Hide toggle, duplicate, delete controls in docs
  if (section === 'docs') {
    return null;
  }

  // Hide toggle, duplicate, delete controls for componentTransfer
  if (noChangesForChildren) {
    return <div className={panelClassList}>{showDocs && <DocsButton />}</div>;
  }

  return (
    <div className={panelClassList}>
      {showDocs && <DocsButton />}

      <button
        className="PrimitivePanelControl PrimitivePanelControl--toggle"
        onClick={togglePrimitive}
        type="button"
        title={primitiveDisabled ? 'Enable' : 'Disable'}
      >
        <Icon symbol={primitiveDisabled ? 'eye' : 'eye-blocked'} color="currentColor" size="16" />
      </button>

      <button
        className="PrimitivePanelControl PrimitivePanelControl--add"
        onClick={duplicatePrimitive}
        type="button"
        title="Duplicate"
      >
        <Icon symbol="plus" color="currentColor" size="14" />
      </button>

      <button
        className="PrimitivePanelControl PrimitivePanelControl--remove"
        type="button"
        onClick={removePrimitive}
        title="Delete"
      >
        <Icon symbol="cross" color="currentColor" size="13" />
      </button>
    </div>
  );
};

export default PrimitivePanelControls;
