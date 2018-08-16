import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {addPrimitive} from '../../store/actions';

import ControlsListTemplate from '../../components/ControlsList';

const mapStateToProps = (state) => {
  return {
    items: state.primitiveControls
  };
};

const mapDispatchProps = (dispatch, {match}) => {
  const {section = 'playground'} = match.params;

  if (section === 'docs') {
    return {};
  }

  return {
    addPrimitive: ({item, nativeEvent}) => {
      dispatch(addPrimitive({
        item,
        nativeEvent,
        section
      }));
    }
  };
};

const PrimitiveControlsList = withRouter(connect(
  mapStateToProps,
  mapDispatchProps
)(ControlsListTemplate));

export default PrimitiveControlsList;
