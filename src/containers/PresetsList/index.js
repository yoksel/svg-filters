import {connect} from 'react-redux';
import withRouter from '../../helpers/withRouter';

import ControlsListTemplate from '../../components/ControlsList';

const mapStateToProps = (state) => {
  return {
    items: state.presetControls,
    control: 'NavLink'
  };
};

const PresetsList = connect(
  mapStateToProps,
  null
)(ControlsListTemplate);

export default withRouter(PresetsList);
