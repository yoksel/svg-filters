import { PayloadAction } from '@reduxjs/toolkit';
import { BaseCoords, DragDropState, Offset } from '../types';
import deepClone from '../../helpers/deepClone';

const reducers = {
  startDrag: (
    state: DragDropState,
    action: PayloadAction<{
      id: string;
      index: number;
      parentId?: string;
      listId?: string;
      elemClientRect: { x: number; width: number; height: number };
      offset: Offset;
    }>,
  ) => {
    // If dragging was started already
    if (state.currentId) {
      return;
    }

    state.currentId = action.payload.id;
    state.index = action.payload.index;
    state.parentId = action.payload.parentId;
    state.listId = action.payload.listId;
    state.elemClientRect = action.payload.elemClientRect;
    state.offset = action.payload.offset;
  },
  moveDrag: (state: DragDropState, action: PayloadAction<{ coords: BaseCoords }>) => {
    state.coords = action.payload.coords;
  },
  updateDragIndex: (state: DragDropState, action: PayloadAction<{ index: number }>) => {
    state.index = action.payload.index;
  },
  addDragItemToList: (
    state: DragDropState,
    action: PayloadAction<{
      id: string;
      parentId?: string;
      listId: string;
      index: number;
      top: number;
      bottom: number;
    }>,
  ) => {
    const listId = action.payload.listId;
    const itemId = action.payload.id;
    let siblingsCoords = deepClone(state.siblingsCoords);

    if (siblingsCoords && !siblingsCoords[listId]) {
      siblingsCoords[listId] = {};
    }

    if (siblingsCoords) {
      siblingsCoords[listId][itemId] = action.payload;
    }

    state.siblingsCoords = siblingsCoords;
  },
  stopDrag: (state: DragDropState) => {
    state.currentId = undefined;
  },
};

export default reducers;
