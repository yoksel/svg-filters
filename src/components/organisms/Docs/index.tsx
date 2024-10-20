import clsx from 'clsx';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DocData, DocsData } from '../../../store/types';

import './Docs.scss';

interface DocsProps {
  docId: string;
  isEmbedded?: boolean;
  docsData: DocsData;
  toggleDocs: () => void;
}

const Docs = ({ docId, isEmbedded, docsData, toggleDocs }: DocsProps) => {
  const [currentProp, setCurrentProp] = useState<string | null>(null);

  const currentDoc = docsData[docId];

  if (!currentDoc) {
    return null;
  }

  const toggleCurrentProp = (propId: string) => {
    setCurrentProp(currentProp === propId ? null : propId);
  };

  const getPropsList = (currentDocProps: DocData['props']): JSX.Element | null => {
    if (!currentDocProps?.length) return null;

    const propsList: (JSX.Element | null)[] = currentDocProps?.map((prop) => {
      let { name: propName, value: propValue, desc: propDesc } = prop;
      let valueElem;
      let propNameElem = <b className="Doc-prop__name">{propName}</b>;

      if (prop?.disable) {
        return null;
      }

      if (!propValue) {
        propValue = docsData[propName].value;
        propDesc = docsData[propName].desc;
      }

      if (propValue) {
        valueElem = (
          <p className="Doc-prop__value">
            <b>Value:</b> {propValue}
          </p>
        );
      }

      return (
        <li
          className={clsx(
            'Docs__item',
            'Doc-prop',
            currentProp === propName ? 'Doc-prop--current' : '',
          )}
          key={propName}
        >
          {!isEmbedded && propNameElem}
          {valueElem}
          {propDesc && (
            <p className="Doc-prop__desc" dangerouslySetInnerHTML={{ __html: propDesc }}></p>
          )}
        </li>
      );
    });

    if (isEmbedded) {
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
          <ul className="Docs__list Docs-tabs__content">{propsList}</ul>
        </div>
      );
    }

    return <ul className="Docs__list Docs-props">{propsList}</ul>;
  };

  const getChildrenList = (currentDocChildren: DocData['children']) => {
    if (!currentDocChildren) {
      return null;
    }

    const childrenList = currentDocChildren.map((childId: string) => {
      const childData = docsData[childId];
      if (!childData) {
        return null;
      }

      let childDesc = null;

      if (childData.desc) {
        childDesc = (
          <div className="Docs__desc" dangerouslySetInnerHTML={{ __html: childData.desc }}></div>
        );
      }

      const childPropsList = getPropsList(childData.props);

      return (
        <div key={childId}>
          <h4 className="Docs__list-title">{childData.name}</h4>
          {childDesc}
          {childPropsList}
        </div>
      );
    });

    return childrenList;
  };

  const DocsClass = clsx('Docs', docId ? 'Docs--opened' : '', isEmbedded ? 'Docs--embeded' : '');

  const { name, desc } = currentDoc;
  const specLink = (
    <a className="Docs__link" href={currentDoc.link} target="_blank" rel="noopener noreferrer">
      Specification
    </a>
  );

  const docLink = isEmbedded && (
    <NavLink className="Docs__link Docs__link--docs" to={`/docs/${docId}`} onClick={toggleDocs}>
      View in docs
    </NavLink>
  );

  const propsList = getPropsList(currentDoc.props);

  const children = getChildrenList(currentDoc.children);

  return (
    <section className={DocsClass}>
      <h2 className="visually-hidden">Docs</h2>
      <div className="Docs__content">
        <h3 className="Docs__title">{name}</h3>
        <div className="Docs__links">
          {specLink}
          {docLink}
        </div>
        {desc && <div className="Docs__desc" dangerouslySetInnerHTML={{ __html: desc }}></div>}

        <h4 className="Docs__list-title">Attributes</h4>
        {propsList}

        {children}
      </div>
    </section>
  );
};

export default Docs;
