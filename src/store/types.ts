import { CSSProperties } from 'react';
import primitives from '../data/primitives';
import primitivesAttrs from '../data/primitivesAttrs';

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

export interface PrimitivesState {
  type?: string;
  filter?: FilterParams;
  docs?: typeof primitives;
  playground: PrimitiveItem[];
  presets?: PrimitiveItem[];
  read?: null;
  primitives?: PrimitiveItem[];
  // primitives?: typeof primitives;
  swapSnapshot?: string;
}

export type SectionState = PrimitivesState['docs'] | PrimitivesState['playground'];

export interface NativeEventCoords {
  offsetX: number;
  offsetY: number;
}
