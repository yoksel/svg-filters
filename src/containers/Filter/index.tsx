import { useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import { RootState } from '../../store';
import useSection from '../../hooks/useSection';

const FilterContainer = () => {
  const { section } = useSection();
  const filterProps = useSelector((state: RootState) => state.primitives.filter);
  const storeKyeBySection = section === 'presets' ? 'presets' : 'primitives';
  const primitives = useSelector((state: RootState) => state.primitives[storeKyeBySection]);

  if (!primitives?.length) return null;

  if (filterProps?.style) {
    delete filterProps.style;
  }

  return <Filter filterProps={filterProps} primitives={primitives} />;
};

export default FilterContainer;
