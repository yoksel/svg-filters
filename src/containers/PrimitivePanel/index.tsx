import { primitivesAttrs } from '../../data';
import { isPrimitivesSection, PrimitiveItem } from '../../store/types';
import useSection from '../../hooks/useSection';
import PrimitivePanelControls from '../PrimitivePanelControls';
import Docs from '../Docs';
import PrimitivePanelInput from '../PrimitivePanelInput';
import ResultAttribute from '../../components/atoms/ResultAttribute';
import clsx from 'clsx';

import './PrimitivePanel.scss';

interface PrimitivePanelProp extends React.PropsWithChildren {
  primitive: PrimitiveItem;
  parentId?: string;
  resultsList: string[];
  parentHasSingleChild?: boolean;
  noChangesForChildren?: boolean;
}

/** Panel with controls to manipulate properties of particular primitive */
const PrimitivePanel = ({
  primitive,
  parentId,
  resultsList,
  children,
  parentHasSingleChild,
  noChangesForChildren,
}: PrimitivePanelProp) => {
  const { section } = useSection();

  if (!isPrimitivesSection(section)) return null;

  const primitiveDisabled = primitive.disabled;
  const groupName = primitive.groupName;
  const groupData = primitivesAttrs[groupName];
  const primitiveName = groupData.name;
  const inputsData = groupData.inputsData;
  const fieldsetProps: { disabled?: boolean } = {};
  const hasChildren = primitive.children ? 'has-children' : 'no-children';
  const PrimitivePanelContentClass = `PrimitivePanel__content PrimitivePanel__content--${hasChildren}`;
  const hasResult = Boolean(primitive.params.result);

  if (primitiveDisabled) {
    fieldsetProps.disabled = true;
  }

  const primitivePropControls = Object.keys(primitive.params).map((key) => {
    const param = primitive.params[key];
    const { value } = param;
    let name = key;

    if (param.disabled) {
      return null;
    }

    // @ts-expect-error
    if (inputsData && inputsData[key] && inputsData[key].name) {
      // @ts-expect-error
      name = inputsData[key].name;
    }

    if (key === 'result') {
      return <ResultAttribute key={value} value={value} />;
    }

    return (
      <label key={key} className="PrimitivePanel__label">
        {name}=
        <PrimitivePanelInput
          primitive={primitive}
          paramKey={key}
          parentId={parentId}
          resultsList={resultsList}
        />
      </label>
    );
  });

  return (
    <div
      className={clsx(
        'PrimitivePanel',
        `PrimitivePanel--${hasChildren}`,
        !hasResult && 'PrimitivePanel--no-result',
      )}
    >
      <fieldset className="PrimitivePanel__fieldset" {...fieldsetProps}>
        <div className={PrimitivePanelContentClass}>
          <div className="PrimitivePanel__tag">{primitiveName}</div>
          {primitivePropControls}

          {primitive.showDocs && (
            <Docs docId={primitive.groupName} id={primitive.id} parentId={parentId} isEmbedded />
          )}

          <div className="PrimitivePanel__children">{children}</div>
        </div>
      </fieldset>

      <PrimitivePanelControls
        primitive={primitive}
        parentId={parentId}
        groupName={groupName}
        section={section}
        primitiveDisabled={primitiveDisabled}
        hasResult={hasResult}
        hasChildrenMod={hasChildren}
        parentHasSingleChild={parentHasSingleChild}
        noChangesForChildren={noChangesForChildren}
      />
    </div>
  );
};

export default PrimitivePanel;
