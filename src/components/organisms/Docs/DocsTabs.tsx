import clsx from 'clsx';
import { DocData } from '../../../store/types';

interface DocsTabsProps extends React.PropsWithChildren {
  currentDocProps: DocData['props'];
  currentProp: string | null;
  toggleCurrentProp: (value: string) => void;
}

const DocsTabs = ({ children, currentDocProps, currentProp, toggleCurrentProp }: DocsTabsProps) => {
  return (
    <div className="Docs-tabs">
      <div className="Docs__list Docs-tabs__controls">
        {currentDocProps?.map(({ name: propName }) => (
          <button
            type="button"
            key={propName}
            className={clsx(
              'Doc-prop__name',
              'Doc-prop__control',
              currentProp === propName ? 'Doc-prop__control--current' : '',
            )}
            onClick={() => {
              toggleCurrentProp(propName);
            }}
          >
            {propName}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
};

export default DocsTabs;
