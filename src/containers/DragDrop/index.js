import React from 'react';
import {connect} from 'react-redux';

import {moveDrag, stopDrag, swapPrimitives} from '../../store/actions';

let DragDrop = (props) => {
  const {
    dragDrop,
    isDragging,
    lastSwapSnapshot,
    onStopDrag,
    onMoveDrag,
    onSwap
  } = props;

  const onMouseUp = () => {
    if (!isDragging) {
      return null;
    }

    onStopDrag();
  };

  const getItemsToSwap = (top) => {
    const {id, parentId, index, siblingsCoords, listId, offset} = dragDrop;
    const siblingsCoordsObj = siblingsCoords[listId];

    const siblingsCoord = Object.values(siblingsCoordsObj);
    const middleY = top + offset.halfHeight;

    const intersections = siblingsCoord.filter(item => {
      if (item.id === id) {
        // Need to keep all items to get right index
        // and remove dragging one just for measures
        return false;
      }
      // Check intersection with the middle of dragging item
      return (middleY > item.top && middleY < item.bottom);
    });

    const foundedIntersection = intersections[0];

    if (!foundedIntersection) {
      return null;
    }

    const indexes = {
      from: index,
      to: foundedIntersection.index
    };

    const swapSnapshot = [
      `${id}-${index}`,
      `${foundedIntersection.id}-${foundedIntersection.index}`
    ].join();

    if (swapSnapshot === lastSwapSnapshot) {
      return null;
    }

    return {
      parentId,
      indexes,
      swapSnapshot
    };
  };

  const onMouseMove = (event) => {
    if (!isDragging) {
      return null;
    }

    const top = event.nativeEvent.pageY - dragDrop.offset.y;
    const swapItemsData = getItemsToSwap(top);

    onMoveDrag({
      top: top
    });

    if (swapItemsData) {
      onSwap(swapItemsData);
    }
  };

  return (
    <div
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {props.children}
    </div>
  );
};

const mapStateToProps = (state, {match}) => {
  return {
    dragDrop: state.dragDrop,
    lastSwapSnapshot: state.primitives.swapSnapshot,
    isDragging: Boolean(state.dragDrop.id)
  };
};

const mapDispatchProps = (dispatch, props) => {
  return {
    onMoveDrag: (coords) => {
      dispatch(moveDrag({coords}));
    },
    onSwap: (swapItemsData) => {
      if (swapItemsData) {
        const newIndex = swapItemsData.indexes.to;

        dispatch(swapPrimitives(swapItemsData));
        dispatch({
          type: 'UDPATE_DRAG_INDEX',
          index: newIndex
        });
      }
    },
    onStopDrag: () => {
      dispatch(stopDrag());
    }
  };
};

DragDrop = connect(
  mapStateToProps,
  mapDispatchProps
)(DragDrop);

export default DragDrop;
