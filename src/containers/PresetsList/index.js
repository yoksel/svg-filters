import {connect} from 'react-redux';

import ControlsListTemplate from '../../components/ControlsList';

const mapStateToProps = (state) => {
  return {
    items: state.presetControls
  };
};

const mapDispatchProps = (dispatch) => {

  return {
    onClick: (preset) => {
      dispatch({
        type: 'ADD_PRESET',
        id: preset.id,
        name: preset.name,
        primitives: preset.primitives,
      });
    }
  };
};

const PresetsList = connect(
  mapStateToProps,
  mapDispatchProps
)(ControlsListTemplate);

export default PresetsList;
