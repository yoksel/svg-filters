import { primitivesAttrs } from '../../../data';

import PrimitivePanelInputText from '../PrimitivePanelInputText';
import PrimitivePanelInputSelect from '../../PrimitivePanelInputSelect';
import PrimitivePanelInputTextarea from '../../PrimitivePanelInputTextarea';
import { PrimitiveItem } from '../Primitive';
import { InputsData, PrimitiveAttributesType } from '../../../data/types';

interface PrimitivePanelInputProps {
  primitive: PrimitiveItem;
  paramKey: string;
  resultsList: string[];
  parentId: string;
}

function isKeyInData(
  paramKey: string,
  inputsData: PrimitiveAttributesType['inputsData'],
): paramKey is keyof PrimitiveAttributesType['inputsData'] {
  return paramKey in inputsData;
}

const PrimitivePanelInput = (props: PrimitivePanelInputProps) => {
  const { primitive, paramKey } = props;
  const { inputsData } = primitivesAttrs[primitive.groupName];
  const inputDataByKey = inputsData[paramKey as keyof typeof inputsData];
  // console.log('===PrimitivePanelInput===');
  // console.log({inputsData})
  // console.log({paramKey})
  // console.log({inputDataByKey})
  // @ts-expect-error: FIX IT
  const type = 'type' in inputDataByKey ? inputDataByKey?.type : undefined;
  // console.log('===///PrimitivePanelInput===');

  // PrimitiveAttributesType
  if (type === 'textarea') {
    return <PrimitivePanelInputTextarea {...props} />;
  } else if (type !== 'select') {
    return <PrimitivePanelInputText {...props} />;
  } else {
    return <PrimitivePanelInputSelect {...props} />;
  }
};

export default PrimitivePanelInput;
