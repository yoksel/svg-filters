import React, {Component} from 'react';

import PrimitiveControlsList from '../../containers/PrimitiveControlsList';
import PresetsList from '../../containers/PresetsList';
import Constructor from '../../containers/Constructor';
import Playground from '../../containers/Playground';
import Code from '../../containers/Code';

import Icons from '../Icons';
import Tabs from '../Tabs';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {sidebarList} = this.props.match.params;

    return (
      <div className="App">
        <Icons/>
        <div className="App__container App__container--list">
          <Tabs
            currentTab = {sidebarList === 'presets' ? 'presets' : 'primitives'}
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

        <div className="App__container App__container--constructor">
          <Constructor/>
        </div>

        <div className="App__container App__container--playground">
          <Playground/>
          <Code/>
        </div>
      </div>
    );
  }
}

export default App;
