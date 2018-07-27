import React, {Component} from 'react';

import Constructor from '../../containers/Constructor';
import Playground from '../../containers/Playground';
import Code from '../../containers/Code';

import Icons from '../Icons';
import Sidebar from '../Sidebar';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Icons/>

      <div className="App__container App__container--list">
        <div className="App__content App__content--sticky">
          <Sidebar/>
        </div>
      </div>

      <div className="App__container App__container--constructor">
        <Constructor/>
      </div>

      <div className="App__container App__container--playground">
        <div className="App__content App__content--sticky">
          <Playground/>
          <Code/>
        </div>
      </div>
    </div>
  );
};

export default App;
