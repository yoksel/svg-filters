import {connect} from 'react-redux';

import {addPreset} from '../../store/actions';

import ControlsListTemplate from '../../components/ControlsList';

const mapStateToProps = (state) => {
  return {
    items: state.presetControls
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    onClick: (preset) => {
      dispatch(addPreset(preset));
    }
  };
};

const PresetsList = connect(
  mapStateToProps,
  mapDispatchProps
)(ControlsListTemplate);

export default PresetsList;
