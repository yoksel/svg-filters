import { useDispatch, useSelector } from 'react-redux';
import ControlsList from '../../components/ControlsList';
import { addPrimitive } from '../../store/primitivesSlice';
import { RootState } from '../../store';
import useSection from '../../hooks/useSection';
import { PrimitiveItem } from '../../components/molecules/Primitive';

const PrimitiveControlsList = () => {
  const dispatch = useDispatch();
  const { section } = useSection();
  const primitives = useSelector((state: RootState) => state.primitives.primitives);

  if (!primitives?.length) return null;

  return (
    <ControlsList
      // TO FIX: dirty hack
      items={primitives as unknown as PrimitiveItem[]}
      control={section === 'docs' ? 'NavLink' : 'button'}
      addPrimitive={({ item, nativeEvent, section }) => {
        if (section === 'docs') return;
        dispatch(addPrimitive({ item, nativeEvent, section }));
      }}
    />
  );
};

export default PrimitiveControlsList;