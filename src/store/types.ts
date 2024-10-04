import { CSSProperties } from 'react';
import primitives from '../data/primitives';
import primitivesAttrs from '../data/primitivesAttrs';

interface ParamValue {
  value: string | number;
  prevValue?: string | number;
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

export type PrimitiveName = keyof typeof primitivesAttrs;

export interface PrimitiveItem {
  id: string;
  groupName: PrimitiveName;
  params: Params;
  name?: string;
  children?: PrimitiveItem[];
  disabled?: boolean;
  justAdded?: boolean;
  showDocs?: boolean;
  nativeEvent?: NativeEventCoords | null;
}

// duplicated for checking keys in type
// might be improved
export enum SectionEnum {
  playground,
  presets,
  docs,
  read,
}

export type Section = 'playground' | 'presets' | 'docs' | 'read';

export type Interpolation = 'linearRGB' | 'sRGB';

export interface FilterParams {
  colorInterpolationFilters?: Interpolation;
  style?: CSSProperties;
}

export interface PrimitivesSections {
  // to keep Preview primitives
  playground: PrimitiveItem[];
  // to keep Presets primitives
  presets?: PrimitiveItem[];
  docs?: PrimitiveItem[];
}

export const isPrimitivesSection = (section: Section): section is keyof PrimitivesSections => {
  return ['playground', 'presets', 'docs'].includes(section);
};

export interface PrimitivesState {
  type?: string;
  filter?: FilterParams;
  sections: PrimitivesSections;
  swapSnapshot?: string;
}

export interface NativeEventCoords {
  left?: number;
  offsetX: number;
  offsetY: number;
}

export interface Preset {
  id: string;
  name: string;
  colorInterpolationFilters?: Interpolation;
  primitives: PrimitiveItem[];
}

export interface Offset {
  x: number;
  y: number;
  middleY: number;
  halfHeight: number;
}

export interface DragClientRect {
  x?: number;
  width?: number | 'auto';
  height?: number | 'auto';
}

export interface DragDropState {
  id?: string;
  type?: string;
  index?: number;
  parentId?: string;
  listId?: string;
  elemClientRect?: DragClientRect;
  offset?: Offset;
  coords?: NativeEventCoords;
  siblingsCoords?: {
    [key: string]: {
      [key: string]: NativeEventCoords | {};
    };
  };
}

export interface PrimitiveActionArgs {
  primitive: PrimitiveItem;
  section: keyof PrimitivesSections;
  id?: string;
  childId?: string;
}

export type ToggleDocsArgs = Omit<PrimitiveActionArgs, 'primitive'>;

export const isPrimitiveItem = (item: PrimitiveItem | Preset): item is PrimitiveItem => {
  return 'groupName' in item;
};
export const isPrimitiveItems = (items: (PrimitiveItem | Preset)[]): items is PrimitiveItem[] => {
  return 'groupName' in items[0];
};
