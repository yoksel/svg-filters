import { useDispatch, useSelector } from 'react-redux';
import ControlsList from '../../components/molecules/ControlsList';
import { addPrimitive } from '../../store/primitivesSlice';
import { RootState } from '../../store/store';
import useSection from '../../hooks/useSection';
import { isPrimitivesSection, PrimitiveItem } from '../../store/types';

const PrimitiveControlsList = () => {
  const dispatch = useDispatch();
  const { section } = useSection();
  const primitives = useSelector((state: RootState) => state.data.primitives);

  if (!primitives?.length) return null;

  return (
    <ControlsList
      // TO FIX: dirty hack
      items={primitives as unknown as PrimitiveItem[]}
      control={section === 'docs' ? 'NavLink' : 'button'}
      addPrimitive={({ primitive, nativeEvent, section }) => {
        if (!isPrimitivesSection(section)) return [];
        dispatch(addPrimitive({ primitive, nativeEvent, section }));
      }}
    />
  );
};

export default PrimitiveControlsList;
