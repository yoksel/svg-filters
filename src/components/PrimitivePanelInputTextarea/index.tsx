import InputTextarea from '../../containers/PrimitivePanelInputTextarea';
import { PrimitiveItem } from '../../store/types';

interface PrimitivePanelInputTextareaProps {
  primitive: PrimitiveItem;
  paramKey: string;
  parentId?: string;
}
const PrimitivePanelInputTextarea = ({
  primitive,
  paramKey,
  parentId,
}: PrimitivePanelInputTextareaProps) => {
  const param = primitive.params[paramKey];
  const { value, type } = param;
  let input;

  let actualValue = value;

  if (!actualValue) {
    actualValue = '';
  }

  input = (
    <InputTextarea
      id={primitive.id}
      parentId={parentId}
      key={primitive.id}
      param={paramKey}
      value={actualValue}
      type={type}
    />
  );

  return input;
};

export default PrimitivePanelInputTextarea;
