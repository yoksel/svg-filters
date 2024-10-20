import clsx from 'clsx';
import { DocData, DocsData } from '../../../store/types';

interface DocsPropsListProps {
  docsData: DocsData;
  currentDocProps: DocData['props'];
  isEmbedded?: boolean;
  currentProp: string | null;
  className: string;
}

const DocsPropsList = ({
  docsData,
  isEmbedded,
  currentDocProps,
  currentProp,
  className,
}: DocsPropsListProps) => {
  return (
    <ul className={clsx('Docs__list', className)}>
      {currentDocProps?.map((prop) => {
        if (prop?.disable) {
          return null;
        }
        let { name: propName, value, desc } = prop;
        const propValue = value ?? docsData[propName].value;
        const propDesc = desc ?? docsData[propName].desc;

        return (
          <li
            className={clsx(
              'Docs__item',
              'Doc-prop',
              currentProp === propName ? 'Doc-prop--current' : '',
            )}
            key={propName}
          >
            {!isEmbedded && <b className="Doc-prop__name">{propName}</b>}
            {propValue && (
              <p className="Doc-prop__value">
                <b>Value:</b> {propValue}
              </p>
            )}
            {propDesc && (
              <p className="Doc-prop__desc" dangerouslySetInnerHTML={{ __html: propDesc }}></p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default DocsPropsList;
