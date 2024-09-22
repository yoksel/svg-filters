import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Code from '../../components/Code';
// import useSection from '../../hooks/useSection';

const CodeContainer = () => {
  // const { section } = useSection();
  const primitives = useSelector((state: RootState) => state.primitives);

  // return <Code primitives={primitives[section]} filterData={primitives.filter} />;
  return <Code primitives={[]} filterData={primitives.filter} />;
};

export default CodeContainer;
