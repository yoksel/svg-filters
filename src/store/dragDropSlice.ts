import { createSlice } from '@reduxjs/toolkit';
import dragDropReducers from './reducers/dragDropReducers';
import { DragDropState } from './types';

const initialState: DragDropState = {
  currentId: undefined,
  type: undefined,
  index: undefined,
  parentId: undefined,
  listId: undefined,
  elemClientRect: undefined,
  offset: undefined,
  coords: undefined,
};

export const dragDropSlice = createSlice({
  name: 'dragDrop',
  initialState,
  reducers: dragDropReducers,
});

export const { startDrag, moveDrag, updateDragIndex, addDragItemToList, stopDrag } =
  dragDropSlice.actions;

export default dragDropSlice.reducer;
