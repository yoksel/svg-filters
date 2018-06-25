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
              <div className="FilterContsructor__container"
                ref={provided.innerRef}
                >
                {this.props.selected.map((primitive, index) => {
                  let resName = primitive.params.result;
                  let resultsList = this.props.selected.slice(0, index)
                    .map(item => item.params.result);

                  return (
                    <Draggable
                      key={resName}
                      index={index}
                      draggableId={resName}
                      >
                      {(provided, snapshot) => {
                        let className = "FilterContsructor__item";

                        return (
                          <div
                            className={className}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            >
                            <FilterConstructorItem
                              primitive={primitive}
                              resultsList={resultsList}
                              selected={this.props.selected}
                              isDragging={snapshot.isDragging}
                              isDroppable={snapshot.draggingOver === 'droppable'}
                              onChange={this.props.onChange}
                              addPrimitive={this.props.addPrimitive}
                              removePrimitive={this.props.removePrimitive}
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  )}
                )}
                {(this.props.selected.length === 0) && (
                  <span className="FilterContsructor__placeholder">Drag primitives here</span>
                )}
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
