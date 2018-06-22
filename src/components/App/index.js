import React, { Component } from 'react';
import './App.css';

import {DragDrop, reorder, move} from '../DragDrop';
import Playground from '../Playground';
import PrimitivesList from '../PrimitivesList';
import PresetsList from '../PresetsList';
import FilterConstructor from '../FilterConstructor';

import primitivesList from '../Data/primitivesDataList.json';

class App extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  state = {
    items: primitivesList,
    selected: []
  };

  id2List = {
    droppable: 'items',
    droppable2: 'selected'
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
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

  onChange(params) {
    const selected = this.state.selected;
    let currentPos = null;
    const currentItem = this.state.selected.filter((item, index) => {
      if(item.name === params.primitiveName) {
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
        <DragDrop state={this.state} onDragEnd={this.onDragEnd}>
          <div className="App__container">
            <h2>PrimitivesList</h2>
            <PrimitivesList
              items={this.state.items}
              selected={this.state.selected}
            />
          </div>

          <div className="App__container">
            <h2>Playground</h2>
            <FilterConstructor
              items={this.state.items}
              selected={this.state.selected}
              onChange={this.onChange}
              />

            <Playground
              selected={this.state.selected}/>
          </div>
        </DragDrop>
      </div>
    );
  }
}

export default App;

// <div className="App__container">
//   <h2>PresetsList</h2>
//   <PresetsList/>
// </div>
