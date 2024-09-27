import { primitivesAttrs } from '../../../data';
import { PrimitiveItem } from '../../../store/types';

interface PrimitiveProps {
  primitive: PrimitiveItem;
  children?: React.ReactNode[];
}

/**
 * Creates primitive element inside element `filter` in [Filter](#filter)
 * It won't be rendered to page
 */
const Primitive = ({ primitive, children }: PrimitiveProps) => {
  const groupData = primitivesAttrs[primitive.groupName];
  const Element = groupData.name;
  const paramsKeys = Object.keys(primitive.params);
  const params = paramsKeys.reduce(
    (prev, param) => {
      let { value, disabled } = primitive.params[param];

      if (disabled) {
        return prev;
      }

      prev[param] = value;

      return prev;
    },
    {} as { [key: string]: string | number },
  );

  return <Element {...params}>{children}</Element>;
};

export default Primitive;
