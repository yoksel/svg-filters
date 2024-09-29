import { PayloadAction } from '@reduxjs/toolkit';
import { DragDropState, NativeEventCoords, Offset } from '../types';
import deepClone from '../../helpers/deepClone';

const reducers = {
  startDrag: (
    state: DragDropState,
    action: PayloadAction<{
      id: string;
      index: number;
      parentId?: string;
      listId?: string;
      elemClientRect: { x: number };
      offset: Offset;
    }>,
  ) => {
    // If dragging was started already
    if (state.id) {
      return state;
    }

    state = {
      ...state,
      id: action.payload.id,
      index: action.payload.index,
      parentId: action.payload.parentId,
      listId: action.payload.listId,
      elemClientRect: action.payload.elemClientRect,
      offset: action.payload.offset,
    };
  },
  moveDrag: (state: DragDropState, action: PayloadAction<{ coords: NativeEventCoords }>) => {
    state.coords = action.payload.coords;
  },
  updateDragIndex: (state: DragDropState, action: PayloadAction<{ index: number }>) => {
    state.index = action.payload.index;
  },
  addDragItemToList: (
    state: DragDropState,
    action: PayloadAction<{
      id: string;
      parentId: string;
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
  stopDrag: () => {
    // state.siblingsCoords;
    // return {
    //       siblingsCoords: state.siblingsCoords,
    //     };
  },
};

export default reducers;
