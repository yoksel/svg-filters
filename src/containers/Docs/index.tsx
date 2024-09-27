import { useDispatch } from 'react-redux';
import Docs from '../../components/Docs';
import useSection from '../../hooks/useSection';
import { toggleDocs } from '../../store/primitivesSlice';

interface DocsContainerProps {
  docId?: string;
  id?: string;
  parentId?: string;
  embeded?: boolean; // to check
}

const DocsContainer = ({ id, docId, parentId }: DocsContainerProps) => {
  const { section, id: idFromUrl } = useSection();
  const dispatch = useDispatch();
  const docsId = id || idFromUrl;

  if (!docsId) return null;

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

  return (
    <Docs
      docId={docId}
      toggleDocs={() => {
        dispatch(toggleDocs(params));
      }}
    />
  );
};

export default DocsContainer;
