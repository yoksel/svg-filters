import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import './DragDrop.css';

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
