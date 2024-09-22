import { createSlice } from '@reduxjs/toolkit';
import primitives from '../data/primitives';
// import docs from '../data/docs';
import { PrimitivesState } from './types';
import primitivesReducers from './reducers/primitivesReducers';

const initialState: PrimitivesState = {
  playground: [],
  primitives,
};

export const primitivesSlice = createSlice({
  name: 'primitives',
  initialState,
  reducers: primitivesReducers,
});

export const {
  addPrimitive,
  discoverPrimitive,
  duplicatePrimitive,
  togglePrimitive,
  deletePrimitive,
  togglePrimitiveProp,
  changePrimitiveProp,
  changePrimitivePropType,
  changeInProps,
  switchOffLastAdded,
  swapPrimitives,
  purgePrimitives,
  switchChild,
  moveToPlayground,
  toggleDocs,
  addPreset,
  setColorInterpolFilters,
} = primitivesSlice.actions;

export default primitivesSlice.reducer;
