import { createSlice } from '@reduxjs/toolkit';
import { PrimitivesState } from './types';
import primitivesReducers from './reducers/primitivesReducers';

const initialState: PrimitivesState = {
  sections: {
    playground: [],
  },
  filter: {
    colorInterpolationFilters: 'linearRGB',
    filterUnits: 'objectBoundingBox',
    primitiveUnits: 'userSpaceOnUse',
  },
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
  addPresetPrimitivesToStage,
  setColorInterpolFilters,
} = primitivesSlice.actions;

export default primitivesSlice.reducer;
