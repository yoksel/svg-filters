import PrimitivePanelInputRadio from '../../containers/PrimitivePanelInputRadio';

import './PrimitivePanelSwitcher.scss';

interface PrimitivePanelSwitcherProps {
  childId: string;
  parentId: string;
  primitiveDisabled?: boolean;
}

const PrimitivePanelSwitcher = ({
  childId,
  parentId,
  primitiveDisabled,
}: PrimitivePanelSwitcherProps) => {
  return (
    <div className="PrimitivePanelSwitcher">
      <label className="PrimitivePanelSwitcher__label">
        <PrimitivePanelInputRadio
          id={childId}
          key={childId}
          parentId={parentId}
          name={parentId}
          checked={!primitiveDisabled}
          value={childId}
          hidden={true}
        />
        <span className="PrimitivePanelSwitcher__control"></span>
      </label>
    </div>
  );
};

export default PrimitivePanelSwitcher;
