import { useDispatch, useSelector } from 'react-redux';
import {
  changeInProps,
  deletePrimitive,
  duplicatePrimitive,
  toggleDocs,
  togglePrimitive,
} from '../../store/primitivesSlice';
import { RootState } from '../../store/store';
import { PrimitiveActionArgs, PrimitiveItem, PrimitivesSections } from '../../store/types';
import clsx from 'clsx';
import PrimitivePanelSwitcher from '../PrimitivePanelSwitcher';

import DocsButton from './DocsButton';
import PrimitivePanelControl from './PrimitivePanelControl';

import './PrimitivePanelControls.scss';

interface PrimitivePanelControlsContainerProps {
  groupName: string;
  hasResult?: boolean;
  hasChildrenMod?: string;
  parentHasSingleChild?: boolean;
  primitiveDisabled?: boolean;
  noChangesForChildren?: boolean;
  primitive: PrimitiveItem;
  parentId?: string;
  section: keyof PrimitivesSections;
}

const PrimitivePanelControlsContainer = (props: PrimitivePanelControlsContainerProps) => {
  const {
    primitive,
    section,
    parentId,
    hasChildrenMod,
    hasResult,
    parentHasSingleChild,
    groupName,
    noChangesForChildren,
    primitiveDisabled,
  } = props;
  const dispatch = useDispatch();
  const id = parentId || primitive.id;
  const childId = parentId ? primitive.id : undefined;
  const docsData = useSelector((state: RootState) => state.data.docs);

  let params: PrimitiveActionArgs = {
    id,
    childId,
    section,
  };

  const panelClassList = clsx(
    'PrimitivePanelControls',
    `PrimitivePanelControls--${hasChildrenMod}`,
    !hasResult && 'PrimitivePanelControls--no-result',
    parentHasSingleChild && 'PrimitivePanelControls--parentHasSingleChild',
  );
  const showDocsButton = !docsData[groupName] || section === 'docs' ? false : true;

  if (parentHasSingleChild && parentId && childId) {
    // Choice of lightning source in feSpecularLighting
    return (
      <div className={panelClassList}>
        <PrimitivePanelSwitcher
          parentId={parentId}
          childId={childId}
          primitiveDisabled={primitiveDisabled}
        />
        {showDocsButton && (
          <DocsButton
            toggleDocs={() => {
              dispatch(toggleDocs(params));
            }}
          />
        )}
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
      <div className={panelClassList}>
        {showDocsButton && (
          <DocsButton
            toggleDocs={() => {
              dispatch(toggleDocs(params));
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={panelClassList}>
      {showDocsButton && (
        <DocsButton
          toggleDocs={() => {
            dispatch(toggleDocs(params));
          }}
        />
      )}

      <PrimitivePanelControl
        type="toggle"
        title={primitiveDisabled ? 'Enable' : 'Disable'}
        symbol={primitiveDisabled ? 'eye' : 'eye-blocked'}
        onClick={() => {
          dispatch(togglePrimitive(params));
          dispatch(changeInProps({ section }));
        }}
      />

      <PrimitivePanelControl
        type="add"
        title="Duplicate"
        symbol="plus"
        onClick={() => {
          dispatch(duplicatePrimitive({ ...params, primitive }));
        }}
      />

      <PrimitivePanelControl
        type="remove"
        title="Delete"
        symbol="cross"
        onClick={() => {
          dispatch(deletePrimitive(params));
          dispatch(changeInProps({ section }));
        }}
      />
    </div>
  );
};

export default PrimitivePanelControlsContainer;
