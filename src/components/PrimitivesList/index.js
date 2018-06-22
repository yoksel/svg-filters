import React, { Component } from 'react';
import './PrimitivesList.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Primitive from '../Primitive';

class PrimitivesList extends Component {
  render() {
    return (
      <div className="PrimitivesList">
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              >
              {this.props.items.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={item.name}
                  index={index}
                  >
                  {(provided, snapshot) => (
                    <div
                      className="PrimitivesList__item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      >
                      <Primitive primitive={item}/>
                    </div>

                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default PrimitivesList;

// {console.log(snapshot.isDraggingOver ? 'blue' : 'grey')}
