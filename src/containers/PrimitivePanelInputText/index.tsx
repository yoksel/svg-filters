import { primitivesAttrs } from '../../data';
import { isPrimitivesSection, PrimitiveItem } from '../../store/types';

import useSection from '../../hooks/useSection';
import { useDispatch } from 'react-redux';
import InputText from '../../components/atoms/InputText';
import { changePrimitiveProp } from '../../store/primitivesSlice';

interface PrimitivePanelInputProps {
  primitive: PrimitiveItem;
  paramKey: string;
  resultsList: string[];
  parentId?: string;
}

const PrimitivePanelInputText = ({ primitive, paramKey, parentId }: PrimitivePanelInputProps) => {
  const { section } = useSection();
  const dispatch = useDispatch();

  if (!isPrimitivesSection(section)) return null;

  const param = primitive.params[paramKey];
  const { value } = param;
  const groupData = primitivesAttrs[primitive.groupName];
  // @ts-expect-error: FIX IT
  const inputData = groupData.inputsData[paramKey];
  const id = primitive.id;

  if (!inputData) return null;

  const min = 'min' in inputData ? inputData.min : undefined;
  const max = 'max' in inputData ? inputData.max : undefined;
  const step = 'step' in inputData ? inputData.step : undefined;
  const double = 'double' in inputData ? inputData.double : undefined;
  const type = 'type' in inputData ? inputData.type : undefined;

  let actualValue = value;
  let valuesList = [];
  let secondValue: string | number = 0;

  if (!actualValue) {
    if (type === 'text') {
      actualValue = '';
    } else {
      actualValue = 0;
    }
  }

  if (double && typeof value === 'string') {
    valuesList = value.split(' ');
    actualValue = valuesList[0];
    secondValue = valuesList[1];
  }

  const onChange = (newValue: string) => {
    const initialProps = {
      id,
      parentId,
      // TODO: fix naming
      param: paramKey,
      value: newValue,
      section,
    };
    dispatch(changePrimitiveProp(initialProps));
  };

  return (
    <>
      <InputText
        step={step}
        min={min}
        max={max}
        value={String(actualValue)}
        secondValue={secondValue}
        type={type}
        onChange={onChange}
      />

      {double && (
        <InputText
          step={step}
          min={min}
          max={max}
          value={String(secondValue)}
          firstValue={actualValue}
          type={type}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default PrimitivePanelInputText;
