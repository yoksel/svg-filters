import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {addPreset, moveDrag, stopDrag, swapPrimitives} from '../../store/actions';

import AppTemplate from '../../components/App';

let App = (props) => {
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
          // Check intersection on the middle of dragging item
          return (middleY > item.top && middleY < item.bottom);
        });

        let swapItems = itemsToSwap[0] && [dragDrop.index, itemsToSwap[0].index];

        onMoveDrag({
          left: left,
          top: top
        });

        if (itemsToSwap[0]) {
          onSwap(swapItems);
        }
      }}
    >
      <AppTemplate {...props}/>
    </div>
  );
};

const mapStateToProps = (state, {match}) => {
  return {
    presetControls: state.presetControls,
    presetId: match.params.presetId,
    dragDrop: state.dragDrop,
    isDragging: Boolean(state.dragDrop.id)
  };
};

const mapDispatchProps = (dispatch, props) => {
  // console.log('mapDispatchProps',props);
  return {
    onMoveDrag: (coords) => {
      dispatch(moveDrag({coords}));
    },
    onSwap: (swap) => {
      if (swap) {
        dispatch(swapPrimitives({swap}));
      }
    },
    onStopDrag: () => {
      dispatch(stopDrag());
    },
    addPreset: (preset) => {
      dispatch(addPreset(preset));
    }
  };
};

App = withRouter(connect(
  mapStateToProps,
  mapDispatchProps
)(App));

export default App;
