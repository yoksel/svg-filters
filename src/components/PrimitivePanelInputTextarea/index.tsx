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
  const { value } = param;

  return (
    <InputTextarea
      id={primitive.id}
      parentId={parentId}
      key={primitive.id}
      param={paramKey}
      value={value || ''}
    />
  );
};

export default PrimitivePanelInputTextarea;
