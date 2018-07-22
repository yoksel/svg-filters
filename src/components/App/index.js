import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Constructor from '../../containers/Constructor';
import Playground from '../../containers/Playground';
import Code from '../../containers/Code';

import {addPreset} from '../../store/actions';

import Icons from '../Icons';
import Sidebar from '../Sidebar';

import './App.css';

class App extends Component {
  setPreset = () => {
    const {presetId} = this.props.match.params;

    if (!presetId) {
      return null;
    }

    const presets = this.props.presetControls;
    const currentPreset = presets.filter(item => item.id === presetId)[0];

    if (currentPreset) {
      this.props.addPreset(currentPreset);
    }
  };

  componentDidMount() {
    this.setPreset();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.presetId !== this.props.presetId) {
      this.setPreset();
    }
  }

  render() {
    return (
      <div className="App">
        <Icons/>

        <div className="App__container App__container--list">
          <Sidebar/>
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

const mapStateToProps = (state, {match}) => {
  return {
    presetControls: state.presetControls,
    presetId: match.params.presetId
  };
};

App = withRouter(connect(
  mapStateToProps,
  {
    addPreset
  }
)(App));

export default App;
