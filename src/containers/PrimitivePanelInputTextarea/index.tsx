import { useDispatch } from 'react-redux';

import useSection from '../../hooks/useSection';

import { changePrimitiveProp } from '../../store/primitivesSlice';
import { isPrimitivesSection, PrimitiveItem } from '../../store/types';

import InputTextarea from '../../components/atoms/InputTextarea';

interface PrimitivePanelInputTextareaProps {
  primitive: PrimitiveItem;
  paramKey: string;
  parentId?: string;
}

const PrimitivePanelInputTextareaContainer = (props: PrimitivePanelInputTextareaProps) => {
  const { section } = useSection();
  const dispatch = useDispatch();
  const { primitive, parentId, paramKey } = props;
  const id = primitive.id;
  const param = primitive.params[paramKey];
  const { value } = param;

  if (!isPrimitivesSection(section)) return null;

  return (
    <InputTextarea
      value={value || ''}
      onChange={(value) => {
        const initialProps = {
          id,
          parentId,
          // TODO: fix naming
          param: paramKey,
          value,
          section,
        };
        dispatch(changePrimitiveProp(initialProps));
      }}
    />
  );
};

export default PrimitivePanelInputTextareaContainer;
