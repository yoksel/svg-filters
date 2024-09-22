import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  getFilteredWithIndex,
  purgeIdKeeperSection,
  resetIdKeeperSection,
  updateUniqueProps,
} from './reducers/helpers';
// import { purgePrimitives as purgePrimitivesAction } from './actions';
import primitives from '../data/primitives';
import docs from '../data/docs';
import { PrimitivesState, Section } from './types';
import primitivesReducers from './reducers/primitivesReducers';

const initialState: PrimitivesState = {
  playground: [],
  primitives: primitives,
};

export const primitivesSlice = createSlice({
  name: 'primitives',
  initialState,
  reducers: primitivesReducers,
});

export const { addPrimitive, discoverPrimitive, purgePrimitives, setColorInterpolFilters } =
  primitivesSlice.actions;

export default primitivesSlice.reducer;
