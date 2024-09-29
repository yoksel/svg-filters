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
import { PrimitiveActionArgs, PrimitiveItem, Section } from '../../store/types';

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
  section: Section;
}

const PrimitivePanelControlsContainer = (props: PrimitivePanelControlsContainerProps) => {
  const { primitive, section, parentId } = props;
  const dispatch = useDispatch();
  const id = parentId || primitive.id;

  let params: PrimitiveActionArgs = {
    primitive,
    id: id,
    childId: parentId ? primitive.id : undefined,
    section,
  };

  return (
    <PrimitivePanelControls
      {...props}
      id={id}
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
