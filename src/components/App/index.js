import React from 'react';

import FilterControls from '../FilterControls';

import AddNew from '../../containers/AddNew';
import VisibleTodoList from '../../containers/VisibleTodoList';

import './App.css';

const App = () => (
  <div style={{padding: 20}}>
    <AddNew/>
    <VisibleTodoList/>
    <p>
      <FilterControls/>
    </p>
  </div>
);

export default App;
