import { PrimitiveItem } from '../components/molecules/Primitive';

export type Section = 'docs' | 'playground';

export interface PrimitivesState {
  type?: string;
  filter?: { colorInterpolationFilters?: string };
  docs?: typeof primitives;
  playground: PrimitiveItem[];
  primitives?: typeof primitives;
}

export type SectionState = PrimitivesState['docs'] | PrimitivesState['playground'];
