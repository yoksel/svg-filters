import clsx from 'clsx';
import Icon from '../atoms/Icon';
import InputTextarea from '../atoms/InputTextarea';
import { getExampleContent } from './getExampleContent';

import './SvgCode.scss';

interface TogglerProps {
  panelIsOpen: boolean;
  hasValue: boolean;
  onClick: () => void;
}

const Toggler = ({ panelIsOpen, hasValue, onClick }: TogglerProps) => {
  const getButtonText = () => {
    if (panelIsOpen) {
      return 'Close';
    }

    if (hasValue) {
      return 'Edit';
    }

    return 'Add';
  };

  return (
    <button className="SvgCode__control SvgCode__control--edit" onClick={onClick}>
      {getButtonText()}
    </button>
  );
};

const Tip = ({ value }: { value: string }) => {
  const valueCleared = value.replace(/"|'/g, '');

  const isFilterInStr = valueCleared.includes('filter=url(#filter)');

  if (!isFilterInStr) {
    return (
      <p className="SvgCode__text">
        Add <code>filter="url(#filter)"</code> as attribute to apply filter effect to group or
        shapes
      </p>
    );
  }

  return null;
};

interface SvgCodeProps {
  value?: string;
  isEditPanelOpen: boolean;
  addExample: (value: string) => void;
  onChange: (value: string) => void;
  toggleEditPanel: (value: boolean) => void;
}

const SvgCode = ({
  addExample,
  value,
  isEditPanelOpen,
  onChange,
  toggleEditPanel,
}: SvgCodeProps) => {
  const togglePanel = () => {
    toggleEditPanel(!isEditPanelOpen);
  };

  return (
    <div className={clsx('SvgCode', isEditPanelOpen && 'SvgCode--opened')}>
      <div className="SvgCode__container">
        <div className="SvgCode__content">
          <button className="SvgCode__close-button" onClick={togglePanel} title="close">
            <Icon symbol="cross" color="currentColor" size="12" />
          </button>

          {value && <Tip value={value} />}

          <InputTextarea
            value={value || ''}
            onChange={onChange}
            className="SvgCode__InputTextarea"
          />

          <button
            className="SvgCode__control SvgCode__control--example"
            onClick={() => {
              addExample(getExampleContent());
            }}
          >
            Add example
          </button>
        </div>
      </div>

      <Toggler panelIsOpen={isEditPanelOpen} onClick={togglePanel} hasValue={Boolean(value)} />
    </div>
  );
};

export default SvgCode;
