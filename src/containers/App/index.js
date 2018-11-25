import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {addPreset, discoveryPrimitive, purgePrimitives} from '../../store/actions';

import {docsData} from '../../components/Data';

import AppTemplate from '../../components/App';
import SinglePage from '../../components/SinglePage';

class App extends Component {
  purgePrev = (prevSection) => {
    if (!prevSection) {
      return null;
    }
    this.props.purgePrimitives(prevSection);
  };

  itemFromPath = () => {
    const {id, section, handlerName} = this.props;
    const currentSet = this.props[section];
    const handler = this.props[handlerName];
    let currentItems = [];

    if (!id) {
      return null;
    }

    if (section === 'docs') {
      if (docsData[id] && docsData[id].primitives) {
        // Doc contains set of primitives for demo
        currentItems = docsData[id].primitives;
      } else {
        // No presets, take from primitiveControls
        currentItems = currentSet.filter(item => item.id === id);
      }
    } else {
      currentItems = currentSet.filter(item => item.id === id);
    }

    if (currentItems) {
      handler(currentItems);
    }
  };

  componentDidMount() {
    this.itemFromPath();
  }

  componentDidUpdate(prevProps) {
    const {id, section} = this.props;

    if (prevProps.id !== id) {
      this.itemFromPath();
    }
    if (prevProps.section !== section) {
      this.purgePrev(prevProps.section);
    }
  }

  render() {
    const {section} = this.props;
    if (section === 'read') {
      return (
        <SinglePage/>
      );
    }

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
    addPreset: (presets) => {
      dispatch(addPreset(presets[0]));
    },
    discoveryPrimitive: (primitives) => {
      dispatch(discoveryPrimitive({primitives}));
    },
    purgePrimitives: (section) => {
      dispatch(purgePrimitives({section}));
    }
  };
};

App = withRouter(connect(
  mapStateToProps,
  mapDispatchProps
)(App));

export default App;
