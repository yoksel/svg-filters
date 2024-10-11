import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Code from '../../components/Code';
import useSection from '../../hooks/useSection';
import { isPrimitivesSection } from '../../store/types';

const CodeContainer = () => {
  const { section } = useSection();
  const primitivesFilter = useSelector((state: RootState) => state.primitives.filter);
  const primitivesBySections = useSelector((state: RootState) => state.primitives.sections);

  if (!isPrimitivesSection(section)) return null;

  return <Code primitives={primitivesBySections[section]} filterData={primitivesFilter} />;
};

export default CodeContainer;
