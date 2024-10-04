import InputText from '../../components/atoms/InputText';
import useSection from '../../hooks/useSection';
import { useDispatch } from 'react-redux';
import { changePrimitiveProp } from '../../store/primitivesSlice';
import { isPrimitivesSection } from '../../store/types';

interface PrimitivePanelInputTextContainerProps {
  id: string;
  parentId?: string;
  param: string;
  value: string;
  firstValue?: string | number;
  secondValue?: string | number;
  step?: number;
  min?: number;
  max?: number;
  type: 'number' | 'text';
}

const PrimitivePanelInputTextContainer = ({
  id,
  parentId,
  param,
  secondValue,
  firstValue,
  type,
  value,
}: PrimitivePanelInputTextContainerProps) => {
  const { section } = useSection();
  const dispatch = useDispatch();

  if (!isPrimitivesSection(section)) return null;

  return (
    <InputText
      onChange={(newValue) => {
        const initialProps = {
          id,
          parentId,
          param,
          value: newValue,
          section,
        };

        dispatch(changePrimitiveProp(initialProps));
      }}
      secondValue={secondValue}
      firstValue={firstValue}
      value={value}
      type={type}
    />
  );
};

export default PrimitivePanelInputTextContainer;
