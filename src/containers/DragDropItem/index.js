import React, {Component} from 'react';
import {connect} from 'react-redux';

import {startDrag} from '../../store/actions';

import Placeholder from '../../components/Placeholder';

import './DragDropItem.css';

class DragDropItem extends Component {
  elem = null;
  coords = {};
  leftSideCoord = 0;

  isDragging() {
    const {id, dragDrop} = this.props;
    return dragDrop && id === dragDrop.id;
  }

  getStatus(position) {
    const isDragging = this.isDragging();
    let status = '';

    if (isDragging) {
      status = 'readyToDrop';

      if (position.left < (this.leftSideCoord - 100)) {
        status = 'notOVerlapTarget';
      }
    }

    return status;
  }

  getPosition() {
    const dragDrop = this.props.dragDrop;
    const isDragging = this.isDragging();
    let position = {};

    if (isDragging) {
      let coords = dragDrop.coords;
      if (!coords) {
        coords = this.coords;
      }
      let width = dragDrop.elemClientRect.width;
      if (coords.left < (this.leftSideCoord - 100)) {
        width = 'auto';
      }

      position = {
        ...coords,
        width
      };
    }

    return position;
  }

  onMouseDown = ({target, nativeEvent}) => {
    const classList = target.classList;

    if (classList.contains('DragDropItem')) {
      const elemClientRect = target.getBoundingClientRect();
      const middleY = elemClientRect.y + elemClientRect.height / 2;

      this.props.startDrag({
        id: this.props.id,
        index: this.props.index,
        parentId: this.props.parentId,
        listId: this.props.listId,
        elemClientRect: elemClientRect,
        offset: {
          x: nativeEvent.offsetX,
          y: nativeEvent.offsetY,
          middleY: middleY,
          halfHeight: elemClientRect.height / 2
        }
      });
    }
  };

  saveItemToList() {
    const top = this.elem.offsetTop;
    const bottom = top + this.elem.offsetHeight;
    const {id, index, parentId, listId} = this.props;
    this.leftSideCoord = this.elem.offsetLeft;

    const params = {
      id,
      parentId,
      listId,
      index,
      top,
      bottom
    };

    this.props.addDragItemToList(params);
  }

  moveJustAdded() {
    const {justAdded, nativeEvent} = this.props;

    // If element was just added with dragDrop
    if (justAdded) {
      const left = nativeEvent.offsetX;

      this.coords = {
        left: left,
      };

      // Force moving duplicated element to cursor,
      // initiate startDrag
      this.onMouseDown({
        target: this.elem,
        nativeEvent
      });
    }
  }

  componentDidMount() {
    this.saveItemToList();
    this.moveJustAdded();
  }

  componentDidUpdate(prevProps) {
    this.coords = {};

    if (prevProps.lastSwapSnapshot !== this.props.lastSwapSnapshot) {
      this.saveItemToList();
      this.moveJustAdded();
    }
  }

  render() {
    const {dragDrop} = this.props;
    const isDragging = this.isDragging();
    const position = this.getPosition();
    const status = this.getStatus(position);

    const classNames = [
      'DragDropItem'
    ];
    isDragging && classNames.push('DragDropItem--dragging');
    status && classNames.push(`DragDropItem--status-${status}`);

    return (
      <div
        className={classNames.join(' ')}
        onMouseDown={this.onMouseDown}
        ref={node => this.elem = node}
      >
        <div
          style={position}
          className="DragDropItem__container">
          {this.props.children}
        </div>

        <Placeholder
          isDragging={isDragging}
          elemClientRect={dragDrop.elemClientRect}/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    dragDrop: state.dragDrop,
    lastSwapSnapshot: state.primitives.swapSnapshot
  };
};

const mapDispatchProps = (
  dispatch,
  props
) => {
  return {
    startDrag: (params) => {
      dispatch(startDrag(params));
    },
    addDragItemToList: (params) => {
      dispatch({
        type: 'ADD_DRAGITEM_TO_LIST',
        dragItem: params
      });
    }
  };
};

DragDropItem = connect(
  mapStateToProps,
  mapDispatchProps
)(DragDropItem);

export default DragDropItem;
