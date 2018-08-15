import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {addPreset, discoveryPrimitive} from '../../store/actions';

import AppTemplate from '../../components/App';

class App extends Component {
  itemFromPath = () => {
    const {id, section, handlerName} = this.props;
    const currentSet = this.props[section];
    const handler = this.props[handlerName];

    if (!id) {
      return null;
    }

    const currentItem = currentSet.filter(item => item.id === id)[0];

    if (currentItem) {
      handler(currentItem);
    }
  };

  componentDidMount() {
    this.itemFromPath();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.itemFromPath();
    }
  }

  render() {
    return (
      <AppTemplate/>
    );
  }
}

const mapStateToProps = (state, {match}) => {
  const {presetControls, primitiveControls} = state;
  const {section, id} = match.params;
  let handlerName;

  if (section === 'presets' && id) {
    handlerName = 'addPreset';
  } else if (section === 'docs' && id) {
    handlerName = 'discoveryPrimitive';
  }

  return {
    id,
    section,
    handlerName,
    docs: primitiveControls,
    presets: presetControls,
  };
};

const mapDispatchProps = (dispatch, props) => {
  return {
    addPreset: (preset) => {
      dispatch(addPreset(preset));
    },
    discoveryPrimitive: (item) => {
      dispatch(discoveryPrimitive({item}));
    }
  };
};

App = withRouter(connect(
  mapStateToProps,
  mapDispatchProps
)(App));

export default App;
