import { PrimitiveItem } from '../components/molecules/Primitive';

export type Section = 'docs' | 'playground';

export interface PrimitivesState {
  type?: string;
  filter?: { colorInterpolationFilters?: string };
  docs?: typeof primitives;
  playground: PrimitiveItem[];
  presets?: PrimitiveItem[];
  primitives?: typeof primitives;
  swapSnapshot?: string;
}

export type SectionState = PrimitivesState['docs'] | PrimitivesState['playground'];
