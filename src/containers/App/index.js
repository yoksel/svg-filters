import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {addPreset} from '../../store/actions';

import AppTemplate from '../../components/App';

class App extends Component {
  setPreset = () => {
    const {section, id} = this.props.match.params;

    if (!id || section !== 'presets') {
      return null;
    }

    const presets = this.props.presetControls;
    const currentPreset = presets.filter(item => item.id === id)[0];

    if (currentPreset) {
      this.props.addPreset(currentPreset);
    }
  };

  componentDidMount() {
    this.setPreset();
  }

  componentDidUpdate(prevProps) {
    if (this.props.section === 'presets') {
      if (prevProps.id !== this.props.id) {
        this.setPreset();
      }
    }

  }

  render() {
    return (
      <AppTemplate/>
    );
  }
}

const mapStateToProps = (state, {match}) => {
  return {
    presetControls: state.presetControls,
    id: match.params.id,
    section: match.params.section
  };
};

const mapDispatchProps = (dispatch, props) => {
  return {
    addPreset: (preset) => {
      dispatch(addPreset(preset));
    }
  };
};

App = withRouter(connect(
  mapStateToProps,
  mapDispatchProps
)(App));

export default App;
