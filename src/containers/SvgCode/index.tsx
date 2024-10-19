import { useDispatch, useSelector } from 'react-redux';

import { toggleEditPanel, updateSvg } from '../../store/previewSlice';

import SvgCode from '../../components/molecules/SvgCode';
import { RootState } from '../../store/store';

const SvgCodeContainer = () => {
  const customSvgCode = useSelector((state: RootState) => state.preview.customSvgCode);
  const isEditPanelOpen = useSelector((state: RootState) => state.preview.isEditPanelOpen);
  const dispatch = useDispatch();

  return (
    <SvgCode
      value={customSvgCode}
      isEditPanelOpen={isEditPanelOpen}
      addExample={(content) => dispatch(updateSvg(content))}
      onChange={(content) => dispatch(updateSvg(content))}
      toggleEditPanel={(isOpen) => dispatch(toggleEditPanel(isOpen))}
    />
  );
};

export default SvgCodeContainer;
