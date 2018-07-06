import React, {Component} from 'react';
import Icons from '../Icons';

import PrimitiveControlsList from '../../containers/PrimitiveControlsList';
import Constructor from '../../containers/Constructor';
import Playground from '../../containers/Playground';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Icons/>
        <div className="App__container">
          PrimitiveControlsList
          <PrimitiveControlsList/>
        </div>

        <div className="App__container">
          <Constructor/>
          Playground
          <Playground/>
        </div>
      </div>
    );
  }
}

export default App;
