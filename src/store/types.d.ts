import { PrimitiveItem } from '../components/molecules/Primitive';

// duplicated for checking keys in type
// might be improved
export enum SectionEnum {
  playground,
  presets,
  docs,
  read,
}

export type Section = 'playground' | 'presets' | 'docs' | 'read';

export interface PrimitivesState {
  type?: string;
  filter?: { colorInterpolationFilters?: string };
  docs?: typeof primitives;
  playground: PrimitiveItem[];
  presets?: PrimitiveItem[];
  read?: null;
  primitives?: typeof primitives;
  swapSnapshot?: string;
}

export type SectionState = PrimitivesState['docs'] | PrimitivesState['playground'];

export interface NativeEventCoords {
  offsetX: number;
  offsetY: number;
}
