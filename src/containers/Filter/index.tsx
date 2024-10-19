import { useSelector } from 'react-redux';

import Filter from '../../components/molecules/Filter';
import { RootState } from '../../store/store';
import useSection from '../../hooks/useSection';
import { isPrimitivesSection } from '../../store/types';

const FilterContainer = () => {
  const { section } = useSection();
  const filterProps = useSelector((state: RootState) => state.primitives.filter);
  const primitives = useSelector((state: RootState) => {
    if (!isPrimitivesSection(section)) return undefined;
    return state.primitives.sections[section];
  });
  const enabledPrimitives = primitives?.filter((item) => !item.disabled);

  if (!enabledPrimitives?.length) return null;

  if (filterProps?.style) {
    delete filterProps.style;
  }

  return <Filter filterProps={filterProps} primitives={enabledPrimitives} />;
};

export default FilterContainer;
