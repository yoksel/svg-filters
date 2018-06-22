import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import './DragDrop.css';

/**
 * A little function to help us with reordering the result
 */
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export class DragDrop extends Component {
  render() {
    return (
        <DragDropContext onDragEnd={this.props.onDragEnd}>
          {this.props.children}
        </DragDropContext>
    );
  }
}

export default DragDrop;
