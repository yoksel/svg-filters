import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import FilterConstructorItem from '../FilterConstructorItem';

import './FilterConstructor.css';

class FilterContsructor extends Component {
  render() {
    const results = {};

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
                      draggableId={primitive.name}
                      index={index}>
                      {(provided, snapshot) => {
                        const resName = primitive.resultName;
                        const index = results[resName] || 0;

                        // console.log(snapshot.isDragging);
                        if (snapshot.draggingOver === 'droppable') {
                          console.log(snapshot.draggingOver);
                        }


                        if (index) {
                          results[resName + index] = index + 1;
                        }
                        else {
                          results[resName] = 0;
                        }

                        return (
                          <div
                            className="FilterContsructor__item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            >
                            <FilterConstructorItem
                              primitive={primitive}
                              results={results}
                              onChange={this.props.onChange}
                            />
                          </div>
                        );
                      }}
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
