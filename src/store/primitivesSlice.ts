import { createSlice } from '@reduxjs/toolkit';
import { PrimitivesState } from './types';
import primitivesReducers from './reducers/primitivesReducers';

export const getInitialState = (): PrimitivesState => {
  return {
    sections: {
      playground: [],
    },
    filter: {
      colorInterpolationFilters: 'linearRGB',
      filterUnits: 'objectBoundingBox',
      primitiveUnits: 'userSpaceOnUse',
    },
  };
};

const initialState: PrimitivesState = getInitialState();

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
  purgeAllPrimitivesExcludingSection,
  togglePrimitiveChild,
  moveToPlayground,
  toggleDocs,
  addPresetPrimitivesToStage,
  setColorInterpolFilters,
} = primitivesSlice.actions;

export default primitivesSlice.reducer;
