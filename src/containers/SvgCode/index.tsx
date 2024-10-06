import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { updateSvg } from '../../store/previewSlice';

import SvgCode from '../../components/SvgCode';

const SvgCodeContainer = ({ value }: { value?: JSX.Element }) => {
  const dispatch = useDispatch();

  return (
    <SvgCode
      value={value}
      addExample={(content) => dispatch(updateSvg(content))}
      onChange={(content) => dispatch(updateSvg(content))}
    />
  );
};

export default SvgCodeContainer;
