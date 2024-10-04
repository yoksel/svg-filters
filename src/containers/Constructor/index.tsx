import { useDispatch, useSelector } from 'react-redux';
import Constructor from '../../components/Constructor';
import useSection from '../../hooks/useSection';
import { RootState } from '../../store';
import { moveToPlayground, purgePrimitives } from '../../store/primitivesSlice';

const ConstructorContainer = () => {
  const { section } = useSection();
  // @ts-expect-error
  const primitives = useSelector((state: RootState) => state.primitives.sections[section]);
  const dispatch = useDispatch();

  return (
    <Constructor
      section={section}
      primitives={primitives || undefined}
      // @ts-expect-error
      purgePrimitives={() => dispatch(purgePrimitives({ section }))}
      // @ts-expect-error
      moveToPlayground={() => dispatch(moveToPlayground({ section }))}
    />
  );
};

export default ConstructorContainer;
