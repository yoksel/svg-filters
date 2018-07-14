import React from 'react';

import FilterControls from '../FilterControls';

import AddNew from '../../containers/AddNew';
import VisibleTodoList from '../../containers/VisibleTodoList';

import './App.css';

const App = (props) => {
  const {filter} = props.match.params;

  return (
    <div className="App">
      <AddNew/>
      <VisibleTodoList filter={filter || 'SHOW_ALL'}/>
      <div>
        <FilterControls/>
      </div>
    </div>
  );
};

export default App;
