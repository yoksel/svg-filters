import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Code from '../../components/Code';
import { useLocation } from 'react-router-dom';

const CodeContainer = () => {
  const { pathname } = useLocation();
  const section = pathname.replaceAll('/', '');
  console.log({ section });
  const primitives = useSelector((state: RootState) => state.primitives);

  // return <Code primitives={primitives[section]} filterData={primitives.filter} />;
  return <Code primitives={[]} filterData={primitives.filter} />;
};

export default CodeContainer;
