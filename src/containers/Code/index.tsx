import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Code from '../../components/Code';
import useSection from '../../hooks/useSection';

const CodeContainer = () => {
  const { section } = useSection();
  const primitivesFilter = useSelector((state: RootState) => state.primitives.filter);
  const primitivesBySections = useSelector((state: RootState) => state.primitives.sections);

  if (!['playground', 'presets', 'docs'].includes(section)) return null;

  // @ts-expect-error
  return <Code primitives={primitivesBySections[section]} filterData={primitivesFilter} />;
};

export default CodeContainer;
