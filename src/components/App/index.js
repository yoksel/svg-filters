import React, {Component} from 'react';
import Icons from '../Icons';

import PrimitiveControlsList from '../../containers/PrimitiveControlsList';
import PresetsList from '../../containers/PresetsList';
import Constructor from '../../containers/Constructor';
import Playground from '../../containers/Playground';

import Tabs from '../../components/Tabs';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Icons/>
        <div className="App__container">
          <Tabs
            items={[
              {
                id: 'primitives',
                name: 'Primitives',
                content: PrimitiveControlsList
              },
              {
                id: 'presets',
                name: 'Presets',
                content: PresetsList
              }
            ]}
          />
        </div>

        <div className="App__container">
          <Constructor/>
          <Playground/>
        </div>
      </div>
    );
  }
}

export default App;
