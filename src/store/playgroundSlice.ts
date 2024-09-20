import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PlaygroundState {
  svgCode: string;
  type: string;
}

const initialState: PlaygroundState = {
  svgCode: '',
  type: 'image-and-text',
};

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    setPlaygroundType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    updateSvg: (state, action: PayloadAction<string>) => {
      state.svgCode = action.payload;
    },
  },
});

export const { setPlaygroundType, updateSvg } = playgroundSlice.actions;

export default playgroundSlice.reducer;
