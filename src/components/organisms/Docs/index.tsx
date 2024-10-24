import clsx from 'clsx';
import { useState } from 'react';

import { DocData, DocsData } from '../../../store/types';

import DocsPropsList from './DocsPropsList';
import DocsTabs from './DocsTabs';
import DocsLinks from './DocsLinks';

import './Docs.scss';

interface DocsProps {
  docId: string;
  isEmbedded?: boolean;
  docsData: DocsData;
  toggleDocs: () => void;
}

/** Shows documentation from spec for given docId */
const Docs = ({ docId, isEmbedded, docsData, toggleDocs }: DocsProps) => {
  const currentDoc = docsData[docId];
  const [currentProp, setCurrentProp] = useState<string | null>(null);

  if (!currentDoc) {
    return null;
  }

  const toggleCurrentProp = (propId: string) => {
    setCurrentProp(currentProp === propId ? null : propId);
  };

  const PropsList = ({ propsList }: { propsList: DocData['props'] }) => {
    if (!propsList?.length) return null;

    return (
      <>
        {isEmbedded && (
          <DocsTabs
            currentDocProps={propsList}
            currentProp={currentProp}
            toggleCurrentProp={toggleCurrentProp}
          ></DocsTabs>
        )}
        <DocsPropsList
          currentDocProps={propsList}
          docsData={docsData}
          isEmbedded={isEmbedded}
          currentProp={currentProp}
          className={clsx(!isEmbedded && 'Docs-props')}
        />
      </>
    );
  };

  return (
    <section
      className={clsx('Docs', docId ? 'Docs--opened' : '', isEmbedded ? 'Docs--embeded' : '')}
    >
      <h2 className="visually-hidden">Docs</h2>
      <div className="Docs__content">
        <h3 className="Docs__title">{currentDoc.name}</h3>
        <DocsLinks
          docId={docId}
          toggleDocs={toggleDocs}
          currentDocLink={currentDoc.link}
          isEmbedded={isEmbedded}
        />
        {currentDoc.desc && (
          <div className="Docs__desc" dangerouslySetInnerHTML={{ __html: currentDoc.desc }}></div>
        )}
        <h4 className="Docs__list-title">Attributes</h4>
        <PropsList propsList={currentDoc.props} />
        {currentDoc.children && (
          <>
            {currentDoc.children.map((childId: string) => {
              const childData = docsData[childId];

              return (
                <div key={childId}>
                  <h4 className="Docs__list-title">{childData.name}</h4>
                  {childData.desc && (
                    <div
                      className="Docs__desc"
                      dangerouslySetInnerHTML={{ __html: childData.desc }}
                    ></div>
                  )}
                  <PropsList propsList={childData.props} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default Docs;
