import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { updateSvg } from '../../store/previewSlice';

import SvgCode from '../../components/SvgCode';

const SvgCodeContainer = ({ value }: { value?: JSX.Element | string }) => {
  const svgCode = useSelector((state: RootState) => state.preview.svgCode);
  const dispatch = useDispatch();

  return (
    <SvgCode
      value={value || svgCode}
      addExample={(content) => dispatch(updateSvg(content))}
      onChange={(content) => dispatch(updateSvg(content))}
    />
  );
};

export default SvgCodeContainer;
