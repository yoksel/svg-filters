import deepClone from '../../helpers/deepClone';

const initialState = {
  siblingsCoords: {}
};

export const dragDrop = (state = initialState, action) => {
  switch (action.type) {
  case 'START_DRAG':
    // If dragging was started already
    if (state.id) {
      return state;
    }

    return {
      ...state,
      id: action.id,
      index: action.index,
      parentId: action.parentId,
      listId: action.listId,
      elemClientRect: action.elemClientRect,
      offset: action.offset
    };

  case 'MOVE_DRAG':
    return {
      ...state,
      coords: action.coords
    };

  case 'UDPATE_DRAG_INDEX':
    return {
      ...state,
      index: action.index
    };

  case 'ADD_DRAGITEM_TO_LIST':
    const listId = action.dragItem.listId;
    const itemId = action.dragItem.id;
    let siblingsCoords = deepClone(state.siblingsCoords);

    if (!siblingsCoords[listId]) {
      siblingsCoords[listId] = {};
    }

    siblingsCoords[listId][itemId] = action.dragItem;

    return {
      ...state,
      siblingsCoords: siblingsCoords
    };

  case 'STOP_DRAG':
    return {
      siblingsCoords: state.siblingsCoords
    };

  default:
    return state;
  }

};

export default dragDrop;
