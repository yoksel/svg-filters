import { useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import { RootState } from '../../store';
import useSection from '../../hooks/useSection';
import { isPrimitivesSection } from '../../store/types';

const FilterContainer = () => {
  const { section } = useSection();
  const filterProps = useSelector((state: RootState) => state.primitives.filter);
  const storeKyeBySection = section === 'presets' ? 'presets' : 'playground';
  const primitives = useSelector((state: RootState) => {
    if (!isPrimitivesSection(storeKyeBySection)) return [];
    return state.primitives.sections[storeKyeBySection];
  });

  if (!primitives?.length) return null;

  if (filterProps?.style) {
    delete filterProps.style;
  }

  return <Filter filterProps={filterProps} primitives={primitives} />;
};

export default FilterContainer;
