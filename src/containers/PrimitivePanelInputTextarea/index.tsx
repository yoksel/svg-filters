import { useDispatch } from 'react-redux';

import useSection from '../../hooks/useSection';

import { changePrimitiveProp } from '../../store/primitivesSlice';
import { isPrimitivesSection } from '../../store/types';

import InputTextarea, { InputTextareaProps } from '../../components/atoms/InputTextarea';

interface PrimitivePanelInputTextareaContainerProps extends Omit<InputTextareaProps, 'onChange'> {
  id: string;
  parentId?: string;
  param: string;
}

const PrimitivePanelInputTextareaContainer = (props: PrimitivePanelInputTextareaContainerProps) => {
  const { section } = useSection();
  const dispatch = useDispatch();

  if (!isPrimitivesSection(section)) return null;

  return (
    <InputTextarea
      {...props}
      onChange={(value) => {
        const { id, parentId, param } = props;

        const initialProps = {
          id,
          parentId,
          param,
          value,
          section,
        };
        dispatch(changePrimitiveProp(initialProps));
      }}
    />
  );
};

export default PrimitivePanelInputTextareaContainer;
