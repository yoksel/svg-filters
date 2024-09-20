import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

import RadioList from '../../components/molecules/RadioList';
import { setColorInterpolFilters } from '../../store/primitivesSlice';

const colorInterpolList = [
  {
    id: 'sRGB',
    name: 'sRGB',
  },
  {
    id: 'linearRGB',
    name: 'linearRGB',
  },
];

const ColorInterpolFiltersSwitcher = () => {
  const filter = useSelector((state: RootState) => state.primitives.filter);
  const dispatch = useDispatch();

  return (
    <div className="ColorInterpolFiltersSwitcher">
      <RadioList
        name="color-interpolation-filters"
        list={colorInterpolList}
        current={filter?.colorInterpolationFilters || 'linearRGB'}
        onChange={(colorInterpol) => {
          dispatch(setColorInterpolFilters(colorInterpol));
        }}
      />
    </div>
  );
};

export default ColorInterpolFiltersSwitcher;
