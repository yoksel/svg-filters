import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Code from '../../components/Code';

const CodeContainer = () => {
  const primitives = useSelector((state: RootState) => state.primitives);

  return <Code primitives={primitives.primitives} filterData={primitives.filter} />;
};

export default CodeContainer;
