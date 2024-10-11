import { useDispatch, useSelector } from 'react-redux';
import Preview from '../../components/atoms/Preview';
import { RootState } from '../../store/store';
import useSection from '../../hooks/useSection';
import { isPrimitivesSection } from '../../store/types';
import { toggleEditPanel } from '../../store/previewSlice';

const PreviewContainer = () => {
  const { section } = useSection();
  const previewType = useSelector((state: RootState) => state.preview.type);
  const customSvgCode = useSelector((state: RootState) => state.preview.customSvgCode);
  const dispatch = useDispatch();
  const primitives = useSelector((state: RootState) => {
    if (!isPrimitivesSection(section)) return [];
    return state.primitives.sections[section];
  });

  return (
    <Preview
      filterId={primitives ? 'filter' : ''}
      previewType={previewType}
      customSvgCode={customSvgCode}
      toggleEditPanel={(isOpen) => dispatch(toggleEditPanel(isOpen))}
    />
  );
};

export default PreviewContainer;
