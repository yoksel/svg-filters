import { useDispatch } from 'react-redux';
import PrimitivePanelControls, {
  PrimitivePanelControlsProps,
} from '../../components/PrimitivePanelControls';
import {
  changeInProps,
  deletePrimitive,
  duplicatePrimitive,
  toggleDocs,
  togglePrimitive,
} from '../../store/primitivesSlice';
import { PrimitiveActionArgs, PrimitiveItem, PrimitivesSections, Section } from '../../store/types';

interface PrimitivePanelControlsContainerProps
  extends Omit<
    PrimitivePanelControlsProps,
    | 'id'
    | 'duplicatePrimitive'
    | 'deletePrimitive'
    | 'changeInProps'
    | 'toggleDocs'
    | 'removePrimitive'
    | 'togglePrimitive'
  > {
  primitive: PrimitiveItem;
  parentId?: string;
  section: keyof PrimitivesSections;
}

const PrimitivePanelControlsContainer = (props: PrimitivePanelControlsContainerProps) => {
  const { primitive, section, parentId } = props;
  const dispatch = useDispatch();
  const id = parentId || primitive.id;
  const childId = parentId ? primitive.id : undefined;

  let params: PrimitiveActionArgs = {
    primitive,
    id,
    childId,
    section,
  };

  return (
    <PrimitivePanelControls
      {...props}
      childId={childId}
      duplicatePrimitive={() => {
        dispatch(duplicatePrimitive(params));
      }}
      removePrimitive={() => {
        dispatch(deletePrimitive(params));
        dispatch(changeInProps({ section }));
      }}
      togglePrimitive={() => {
        dispatch(togglePrimitive(params));
        dispatch(changeInProps({ section }));
      }}
      toggleDocs={() => {
        dispatch(toggleDocs(params));
      }}
    />
  );
};

export default PrimitivePanelControlsContainer;
