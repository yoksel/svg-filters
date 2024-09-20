// export const presetControls = (state = [], action) => {
//   switch (action.type) {

//   default:
//     return state;
//   }
// };

// export default presetControls;
// import {primitivesData, presetsData} from './data';

import { createSlice } from '@reduxjs/toolkit';
import { presetsData } from '../data';
// import type { PayloadAction } from '@reduxjs/toolkit';
console.log(presetsData);

export type PresetControlsState = [];

const initialState: PresetControlsState = [];

export const presetControlsSlice = createSlice({
  name: 'presetControls',
  initialState,
  reducers: {},
});

// export const { setPresetControlsTypeResult, updateSvg } = presetControlsSlice.actions;

export default presetControlsSlice.reducer;
