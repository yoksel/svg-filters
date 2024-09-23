import { useSelector } from 'react-redux';

import Filter from '../../components/Filter';
import { RootState } from '../../store';

const FilterContainer = () => {
  const filterProps = useSelector((state: RootState) => state.primitives.filter);
  const primitives = useSelector((state: RootState) => state.primitives.primitives);

  if (filterProps?.style) {
    delete filterProps.style;
  }

  // @ts-expect-error
  return <Filter filterProps={filterProps} primitives={primitives} />;
};

export default FilterContainer;
