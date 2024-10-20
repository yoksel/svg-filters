import { useDispatch, useSelector } from 'react-redux';
import Docs from '../../components/organisms/Docs';
import useSection from '../../hooks/useSection';
import { toggleDocs } from '../../store/primitivesSlice';
import { isPrimitivesSection, PrimitivesSections } from '../../store/types';
import { RootState } from '../../store/store';

interface DocsContainerProps {
  primitiveGroupName?: string;
  parentId?: string;
  isEmbedded?: boolean; // to check
}

const DocsContainer = ({ primitiveGroupName, parentId, isEmbedded }: DocsContainerProps) => {
  const { section, id: idFromUrl } = useSection();
  // id prop is used to show docs in primitive panel
  // otherwise we are on docs and id should be taken from url
  const docsId = primitiveGroupName || idFromUrl;
  const dispatch = useDispatch();
  const docsData = useSelector((state: RootState) => state.data.docs);

  if (!docsId || !isPrimitivesSection(section)) return null;

  let params: { id: string; section: keyof PrimitivesSections; childId?: string } = {
    id: docsId,
    section,
  };

  if (parentId && docsId) {
    params.id = parentId;
    params.childId = docsId;
  }

  return (
    <Docs
      docId={docsId}
      docsData={docsData}
      isEmbedded={isEmbedded}
      toggleDocs={() => {
        dispatch(toggleDocs(params));
      }}
    />
  );
};

export default DocsContainer;
