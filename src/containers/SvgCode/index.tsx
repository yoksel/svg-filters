import { useDispatch, useSelector } from 'react-redux';

import { updateSvg } from '../../store/previewSlice';

import SvgCode from '../../components/SvgCode';
import { RootState } from '../../store';

const SvgCodeContainer = () => {
  const customSvgCode = useSelector((state: RootState) => state.preview.customSvgCode);
  const dispatch = useDispatch();

  return (
    <SvgCode
      value={customSvgCode}
      addExample={(content) => dispatch(updateSvg(content))}
      onChange={(content) => dispatch(updateSvg(content))}
    />
  );
};

export default SvgCodeContainer;
