import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import PresetsList from '../PresetsList';
import FilterConstructor from '../FilterConstructor';
import Playground from '../Playground';
import PrimitivesList from '../PrimitivesList';

import { primitivesList } from '../Data';

import { deepClone, reorder, move } from '../Helpers';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  state = {
    items: primitivesList,
    selected: [],
    collections: {}
  };

  id2List = {
    droppable: 'items',
    droppable2: 'selected'
  };

  getList = id => this.state[this.id2List[id]];

  // Copy privitive to new instance
  addPrimitive = id => {
    const selected = this.state.selected;
    const collections = this.state.collections;
    let sourceIndex;
    const [source] = selected.filter((item, index) => {
      if(item.id === id) {
        sourceIndex = index;
        return true;
      }
      return false;
    });
    const resultName = source.resultName;

    // Copy source
    const copied = deepClone(source);

    if(!collections[resultName]) {
      collections[resultName] = 0;
    }

    collections[resultName]++;

    const newResultName = copied.resultName + collections[resultName];

    copied.id = newResultName;
    copied.params.result = newResultName;

    // Insert to 'selected' list
    selected.splice(sourceIndex + 1, 0, copied);

    this.setState({
      collections: collections,
      selected: selected
    });
  }

  // Delete privitive
  // TODO: place last primitive of group back to list
  removePrimitive = (id) => {
    const selected = this.state.selected;

    let deletedIndex;

    selected.filter((item, index) => {
      if(item.id === id) {
        deletedIndex = index;
        return true;
      }
      return false;
    });

    selected.splice(deletedIndex, 1);

    this.setState({
      selected: selected
    });
  }

  // Save draggable items after dragging
  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Reorder in same list
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === 'droppable2') {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      // Move to another list
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2
      });
    }
  };

  // Save data from inputs to state
  onChange = params => {
    const selected = this.state.selected;
    let currentPos = null;
    const currentItem = this.state.selected.filter((item, index) => {
      if(item.id === params.id) {
        currentPos = index;
        return true;
      }
      return false;
    });

    if (!currentItem[0]) {
      return;
    }
    selected[currentPos].params[params.param].value = params.value;

    this.setState({
        selected: selected
    });
  }

  render() {
    return (
      <div className="App">
        <DragDropContext
          onDragEnd={this.onDragEnd}
          >
          <div className="App__container">
            <h2>PrimitivesList</h2>
            <PrimitivesList
              items={this.state.items}
              selected={this.state.selected}
            />
          </div>

          <div className="App__container App__container--Playground">
            <h2>Playground</h2>
            <FilterConstructor
              items={this.state.items}
              selected={this.state.selected}
              onChange={this.onChange}
              addPrimitive={this.addPrimitive}
              removePrimitive={this.removePrimitive}
              />

            <Playground
              selected={this.state.selected}/>
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default App;

// <div className="App__container">
//   <h2>PresetsList</h2>
//   <PresetsList/>
// </div>
