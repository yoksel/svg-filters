// export const presetControls = (state = [], action) => {
//   switch (action.type) {

//   default:
//     return state;
//   }
// };

// export default presetControls;
// import {primitivesData, presetsData} from './data';

import { createSlice } from '@reduxjs/toolkit';
// import { presetsData } from '../data';
import presets from '../data/presets';
import primitives from '../data/primitives';
import docs from '../data/docs';

import { Preset, PrimitiveItem, DocsData } from './types';
// import type { PayloadAction } from '@reduxjs/toolkit';
// console.log(presetsData);

export type DataState = { presets: Preset[]; primitives: PrimitiveItem[]; docs: DocsData };

const initialState: DataState = { presets, primitives, docs };

export const presetControlsSlice = createSlice({
  name: 'presetControls',
  initialState,
  reducers: {},
});

// export const { setPresetControlsTypeResult, updateSvg } = presetControlsSlice.actions;

export default presetControlsSlice.reducer;
