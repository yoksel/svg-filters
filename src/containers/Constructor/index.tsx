import { useDispatch, useSelector } from 'react-redux';
import Constructor from '../../components/Constructor';
import useSection from '../../hooks/useSection';
import { RootState } from '../../store';
import { moveToPlayground, purgePrimitives } from '../../store/primitivesSlice';

const ConstructorContainer = () => {
  const { section } = useSection();
  const primitives = useSelector((state: RootState) => state.primitives[section]);
  const dispatch = useDispatch();

  return (
    <Constructor
      section={section}
      primitives={primitives || undefined}
      purgePrimitives={() => dispatch(purgePrimitives({ section }))}
      moveToPlayground={() => dispatch(moveToPlayground({ section }))}
    />
  );
};

export default ConstructorContainer;
