export const dragDrop = (state = {}, action) => {
  switch (action.type) {
  case 'START_DRAG':
    return {
      id: action.id,
      index: action.index,
      parentId: action.parentId,
      elemClientRect: action.elemClientRect,
      offset: action.offset,
      getSiblingsCoords: action.getSiblingsCoords,
    };

  case 'MOVE_DRAG':
    return {
      ...state,
      coords: action.coords
    };

  case 'STOP_DRAG':
    return {};

  default:
    return state;
  }

};

export default dragDrop;
