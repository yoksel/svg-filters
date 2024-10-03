import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PreviewState {
  svgCode: string;
  type: string;
}

const initialState: PreviewState = {
  svgCode: '',
  type: 'image-and-text',
};

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    setPreviewType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    updateSvg: (state, action: PayloadAction<string>) => {
      state.svgCode = action.payload;
    },
  },
});

export const { setPreviewType, updateSvg } = playgroundSlice.actions;

export default playgroundSlice.reducer;
