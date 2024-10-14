import { useDispatch } from 'react-redux';

import { switchChild } from '../../store/primitivesSlice';
import InputRadio, { InputRadioProps } from '../../components/atoms/InputRadio';
import useSection from '../../hooks/useSection';
import { isPrimitivesSection } from '../../store/types';

interface PrimitiveInputRadioContainerProps extends Omit<InputRadioProps, 'onChange'> {
  id: string;
  parentId: string;
}

const PrimitiveInputRadioContainer = (props: PrimitiveInputRadioContainerProps) => {
  const { section } = useSection();
  const { parentId } = props;
  const dispatch = useDispatch();

  if (!isPrimitivesSection(section)) return null;

  return (
    <InputRadio
      {...props}
      onChange={(targetId: string) => {
        dispatch(
          switchChild({
            id: targetId,
            parentId,
            section,
          }),
        );
      }}
    />
  );
};

export default PrimitiveInputRadioContainer;
