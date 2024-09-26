import { primitivesAttrs } from '../../../data';
import { NativeEventCoords } from '../../../store/types';

interface ParamValue {
  value: string | number;
  disabled?: boolean;
  type?: string;
  variants?: {
    key: string;
    values?: { [key: string]: string | number };
  };
}

export interface Params {
  [key: string]: ParamValue;
}

export interface PrimitiveItem {
  id: string;
  groupName: keyof typeof primitivesAttrs;
  params: Params;
  name?: string;
  children?: PrimitiveItem[];
  disabled?: boolean;
  justAdded?: boolean;
  showDocs?: boolean;
  nativeEvent?: NativeEventCoords | null;
}

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
