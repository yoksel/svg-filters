import { primitivesAttrs } from '../../data';
import { PrimitiveAttributesType } from '../../data/types';
import { PrimitiveItem } from '../../store/types';

import PrimitivePanelInputText from '../PrimitivePanelInputText';
import PrimitivePanelInputSelect from '../../components/PrimitivePanelInputSelect';
import PrimitivePanelInputTextarea from '../PrimitivePanelInputTextarea';

interface PrimitivePanelInputProps {
  primitive: PrimitiveItem;
  paramKey: string;
  resultsList: string[];
  parentId?: string;
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
  // @ts-expect-error: FIX IT
  let type = 'type' in inputDataByKey ? inputDataByKey?.type : undefined;

  if (primitive.params[paramKey].type) {
    // to get switched types in colormatrix
    type = primitive.params[paramKey].type;
  }

  // PrimitiveAttributesType
  if (type === 'textarea') {
    return <PrimitivePanelInputTextarea {...props} />;
  } else if (type === 'select') {
    return <PrimitivePanelInputSelect {...props} />;
  } else {
    return <PrimitivePanelInputText {...props} />;
  }
};

export default PrimitivePanelInput;
