import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PreviewState {
  customSvgCode: string;
  type: string;
}

const initialState: PreviewState = {
  customSvgCode: '',
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
      state.customSvgCode = action.payload;
    },
  },
});

export const { setPreviewType, updateSvg } = playgroundSlice.actions;

export default playgroundSlice.reducer;
