import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {addPreset} from '../../store/actions';

import AppTemplate from '../../components/App';

class App extends Component {
  setPreset = () => {
    const {presetId} = this.props;

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
      <AppTemplate/>
    );
  }
}

const mapStateToProps = (state, {match}) => {
  const {section, id} = match.params;
  let presetId;
  if (section === 'presets' && id) {
    presetId = id;
  }
  return {
    presetControls: state.presetControls,
    presetId: presetId,
    section: section
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
