import { useDispatch, useSelector } from 'react-redux';
import Docs from '../../components/organisms/Docs';
import useSection from '../../hooks/useSection';
import { toggleDocs } from '../../store/primitivesSlice';
import { isPrimitivesSection } from '../../store/types';
import { RootState } from '../../store/store';

interface DocsContainerProps {
  docId?: string;
  id?: string;
  parentId?: string;
  isEmbedded?: boolean; // to check
}

const DocsContainer = ({ id, docId, parentId, isEmbedded }: DocsContainerProps) => {
  const { section, id: idFromUrl } = useSection();
  /// WTF
  const docsId = id || idFromUrl;
  const dispatch = useDispatch();
  const docsData = useSelector((state: RootState) => state.data.docs);

  if (!docsId || !isPrimitivesSection(section)) return null;

  let params = {
    id: docsId,
    section,
    childId: '', // fix it
  };

  if (parentId && docsId) {
    params.id = parentId;
    params.childId = docsId;
  }

  // WTF
  if (section === 'docs' && docsId) {
    docId = docsId;
  }

  if (!docId) return null;

  return (
    <Docs
      docId={docId}
      docsData={docsData}
      isEmbedded={isEmbedded}
      toggleDocs={() => {
        dispatch(toggleDocs(params));
      }}
    />
  );
};

export default DocsContainer;
