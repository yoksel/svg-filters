import { primitivesAttrs } from '../../data';
import { PrimitiveItem } from '../../store/types';

export const getPrimitiveCode = (primitive: PrimitiveItem, level: number = 1) => {
  const groupData = primitivesAttrs[primitive.groupName];
  const paramsKeys = Object.keys(primitive.params);
  const prefix = level === 2 ? '\t\t' : '\t';
  const primitiveName = groupData.name;

  const params = paramsKeys.reduce<string[]>((prev, paramName) => {
    const param = primitive.params[paramName];
    // @ts-expect-error
    const inputData = groupData?.inputsData?.[paramName];
    let { value, disabled } = param;

    if (disabled) {
      return prev;
    }

    if (inputData && inputData.name) {
      paramName = inputData.name;
    }

    prev.push(`${paramName}="${value}"`);

    return prev;
  }, []);

  if (primitive.children) {
    const stringifiedChildren = primitive.children
      .filter((child) => !child.disabled)
      .map((child: PrimitiveItem): string => {
        return getPrimitiveCode(child, 2);
      });
    return `${prefix}<${primitiveName} ${params.join(' ')}>\n${stringifiedChildren.join('\n')}\n${prefix}</${primitiveName}>`;
  }

  return `${prefix}<${primitiveName} ${params.join(' ')}/>`;
};

export const getAllPrimitivesCode = (primitives?: PrimitiveItem[]): string[] => {
  if (!primitives?.length) return [];

  return primitives
    .filter((primitive) => !primitive.disabled)
    .map((primitive) => {
      primitive = structuredClone(primitive);

      return getPrimitiveCode(primitive);
    });
};
