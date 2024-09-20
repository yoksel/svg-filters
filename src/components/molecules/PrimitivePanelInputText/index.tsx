import {primitivesAttrs} from '../../../data';

import InputTextContainer from '../../../containers/PrimitivePanelInputText';
import {PrimitiveItem} from '../Primitive';
import {InputsData} from '../../../data/types';

interface PrimitivePanelInputProps {
  primitive: PrimitiveItem;
  paramKey: string;
  resultsList: string[];
  parentId: string;
};

const PrimitivePanelInputText = ({primitive, paramKey, parentId}: PrimitivePanelInputProps) => {
  const param = primitive.params[paramKey];
  const {value} = param;
  const groupData = primitivesAttrs[primitive.groupName];
  // @ts-expect-error: FIX IT
  const inputData = groupData.inputsData[paramKey];

  if(!inputData) return null;

  const min = ('min' in inputData) ? inputData.min : undefined;
  const max = ('max' in inputData) ? inputData.max : undefined;
  const step = ('step' in inputData) ? inputData.step : undefined;
  const double = ('double' in inputData) ? inputData.double : undefined;
  const type = ('type' in inputData) ? inputData.type : undefined;

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

  return (
    <>
      <InputTextContainer
        id={primitive.id}
        key={primitive.id}
        param={paramKey}
        value={actualValue}
        secondValue={secondValue}
        step={step}
        min={min}
        max={max}
        type={type}
        parentId={parentId}
      />

      {double && (
        <InputTextContainer
          id={primitive.id}
          key={primitive.id+1}
          param={paramKey}
          value={secondValue}
          firstValue={actualValue}
          step={step}
          min={min}
          max={max}
          type={type}
          parentId={parentId}
        />
      )}
    </>
  )
};

export default PrimitivePanelInputText;
