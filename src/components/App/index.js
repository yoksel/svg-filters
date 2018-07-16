import React, {Component} from 'react';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../../store/reducers';
import {addPreset} from '../../store/actions';
import {primitivesData, presetsData} from '../Data';

import PrimitiveControlsList from '../../containers/PrimitiveControlsList';
import PresetsList from '../../containers/PresetsList';
import Constructor from '../../containers/Constructor';
import Playground from '../../containers/Playground';
import Code from '../../containers/Code';

import Icons from '../Icons';
import Tabs from '../Tabs';

import './App.css';

const store = createStore(reducers);

// Add initial data
store.dispatch({
  type: 'ADD_All_PRIMITIVE_CONTROLS',
  data: primitivesData
});
store.dispatch({
  type: 'ADD_All_PRESET_CONTROLS',
  data: presetsData
});

const setPreset = (presetId) => {
  if (!presetId) {
    return null;
  }

  const state = store.getState();
  const presets = state.presetControls;
  const currentPreset = presets.filter(item => item.id === presetId)[0];

  if (currentPreset) {
    store.dispatch(addPreset(currentPreset));
  }

};

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    const {presetId} = props.match.params;
    setPreset(presetId);
    return null;
  }

  render() {
    const {sidebarList, presetId} = this.props.match.params;

    return (
      <Provider store={store}>

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

      </Provider>
    );
  }
}

export default App;
