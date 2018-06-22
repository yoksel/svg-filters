import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import FilterConstructorItem from '../FilterConstructorItem';

import './FilterConstructor.css';

class FilterContsructor extends Component {
  render() {
    return (
        <div className="FilterContsructor">
          &lt;filter id="#filter">
          <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                >
                {this.props.selected.map((primitive, index) => {
                  return (
                    <Draggable
                      key={index}
                      draggableId={primitive.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          className="FilterContsructor__item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          >
                          <FilterConstructorItem
                            primitive={primitive}
                            onChange={this.props.onChange}
                          />
                        </div>
                      )}
                    </Draggable>
                  )}
                )}
                {(this.props.selected.length === 0) && '...'}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          &lt;/filter>
        </div>
    );
  }
}

export default FilterContsructor;
