import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {moveDrag, stopDrag, swapPrimitives} from '../../store/actions';

let DragDrop = (props) => {
  const {
    dragDrop,
    isDragging,
    onStopDrag,
    onMoveDrag,
    onSwap
  } = props;

  return (
    <div
      onMouseUp={() => {
        if (!isDragging) {
          return null;
        }

        onStopDrag();
      }}
      onMouseMove={(event) => {
        if (!isDragging) {
          return null;
        }

        const itemsCoords = dragDrop.getSiblingsCoords(dragDrop);
        const left = event.nativeEvent.x - dragDrop.offset.x;
        const top = event.nativeEvent.y - dragDrop.offset.y;
        const middleY = top + dragDrop.offset.middleY;

        const itemsToSwap = itemsCoords.filter(item => {
          if (item.id === dragDrop.id) {
            // Need to keep all items to get right index
            // and remove dragging one just for measures
            return false;
          }
          // Check intersection with the middle of dragging item
          return (middleY > item.top && middleY < item.bottom);
        });

        let swapItems = itemsToSwap[0] && [dragDrop.index, itemsToSwap[0].index];

        onMoveDrag({
          left: left,
          top: top
        });

        if (itemsToSwap[0]) {
          onSwap({
            swap: swapItems,
            parentId: dragDrop.parentId
          });
        }
      }}
    >
      {props.children}
    </div>
  );
};

const mapStateToProps = (state, {match}) => {
  return {
    dragDrop: state.dragDrop,
    isDragging: Boolean(state.dragDrop.id)
  };
};

const mapDispatchProps = (dispatch, props) => {
  return {
    onMoveDrag: (coords) => {
      dispatch(moveDrag({coords}));
    },
    onSwap: ({swap, parentId}) => {
      if (swap) {
        dispatch(swapPrimitives({swap, parentId}));
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
