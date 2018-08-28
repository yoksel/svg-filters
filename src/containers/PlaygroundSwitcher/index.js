import React, {Component} from 'react';

import {connect} from 'react-redux';

import {setPlaygroundType as setPlaygroundTypeAction} from '../../store/actions';

import RadioList from '../../components/RadioList';

const typesList = [
  {
    id: 'image-and-text',
    name: 'Image and Text'
  },
  {
    id: 'image',
    name: 'Image'
  },
  {
    id: 'text',
    name: 'Text'
  }
];

class PlaygroundSwitcher extends Component {
  render() {
    const {
      playgroundType,
      setPlaygroundType
    } = this.props;

    return (
      <div className="PlaygroundSwitcher">
        <RadioList
          list={typesList}
          current={playgroundType}
          onChange={(type) => {
            setPlaygroundType(type);
          }}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playgroundType: state.primitives.playgroundType
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    setPlaygroundType: (playgroundType) => {
      dispatch(setPlaygroundTypeAction({playgroundType}));
    }
  };
};

PlaygroundSwitcher = connect(
  mapStateToProps,
  mapDispatchProps
)(PlaygroundSwitcher);

export default PlaygroundSwitcher;
