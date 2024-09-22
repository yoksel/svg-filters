import { useDispatch, useSelector } from 'react-redux';

import SvgCode from '../../components/SvgCode';
import { RootState } from '../../store';
import { updateSvg } from '../../store/playgroundSlice';

const SvgCodeContainer = ({ value }: { value?: JSX.Element | string }) => {
  const svgCode = useSelector((state: RootState) => state.playground.svgCode);
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