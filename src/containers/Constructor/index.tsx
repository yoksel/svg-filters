import { useDispatch, useSelector } from 'react-redux';
import Constructor from '../../components/Constructor';
import useSection from '../../hooks/useSection';
import { RootState } from '../../store/store';
import { moveToPlayground, purgePrimitives } from '../../store/primitivesSlice';
import { isPrimitivesSection } from '../../store/types';

const ConstructorContainer = () => {
  const { section } = useSection();
  const primitives = useSelector((state: RootState) => {
    if (!isPrimitivesSection(section)) return;
    return state.primitives.sections[section];
  });
  const dispatch = useDispatch();
  if (!isPrimitivesSection(section)) return null;

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
