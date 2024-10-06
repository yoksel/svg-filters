import { useSelector } from 'react-redux';
import Preview from '../../components/atoms/Preview';
import { RootState } from '../../store';
import useSection from '../../hooks/useSection';
import { isPrimitivesSection } from '../../store/types';

const PreviewContainer = () => {
  const { section } = useSection();
  const previewType = useSelector((state: RootState) => state.preview.type);
  const customSvgCode = useSelector((state: RootState) => state.preview.customSvgCode);
  const primitives = useSelector((state: RootState) => {
    if (!isPrimitivesSection(section)) return [];
    return state.primitives.sections[section];
  });

  return (
    <Preview
      filterId={primitives ? 'filter' : ''}
      previewType={previewType}
      customSvgCode={customSvgCode}
    />
  );
};

export default PreviewContainer;
