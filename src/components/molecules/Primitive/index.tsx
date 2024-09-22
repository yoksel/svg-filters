import { primitivesAttrs } from '../../../data';

export interface Params {
  [key: string]: { value: string | number; disabled: boolean; type?: string };
}

export interface PrimitiveItem {
  id: string;
  groupName: keyof typeof primitivesAttrs;
  params: Params;
  children?: PrimitiveItem[];
  disabled?: boolean;
}

interface PrimitiveProps {
  primitive: PrimitiveItem;
}

/**
 * Creates primitive element inside element `filter` in [Filter](#filter)
 * It won't be rendered to page
 */
const Primitive = ({ primitive }: PrimitiveProps) => {
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

  // console.log(groupData);
  // console.log(Element)
  // @ts-expect-error WTF
  return <Element {...params}>{primitive.children}</Element>;
};

export default Primitive;
