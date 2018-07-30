import React, {Component} from 'react';
import {connect} from 'react-redux';

import {startDrag} from '../../store/actions';

import Placeholder from '../../components/Placeholder';

import './DragDropItem.css';

class DragDropItem extends Component {
  elem = null;

  isDragging() {
    const {id, dragDrop} = this.props;
    return dragDrop && id === dragDrop.id;
  }

  getPosition() {
    const dragDrop = this.props.dragDrop;
    const isDragging = this.isDragging();
    let position = {};

    if (isDragging) {
      position = {
        ...dragDrop.coords,
        width: dragDrop.elemClientRect.width
      };
    }

    return position;
  }

  onMouseDown = ({target, nativeEvent}) => {
    const className = target.className;

    if (className === 'DragDropItem') {
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

  componentDidMount() {
    this.saveItemToList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lastSwapSnapshot !== this.props.lastSwapSnapshot) {
      this.saveItemToList();
    }
  }

  render() {
    const dragDrop = this.props.dragDrop;

    const isDragging = this.isDragging();
    const classNames = [
      'DragDropItem'
    ];
    isDragging && classNames.push('DragDropItem--dragging');

    const position = this.getPosition();

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
