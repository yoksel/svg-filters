import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {purgePrimitives} from '../../store/actions';

import ConstructorTemplate from '../../components/Constructor';

const mapStateToProps = (state, {match}) => {
  const {section = 'playground'} = match.params;

  return {
    primitives: state.primitives.list,
    dragDrop: state.dragDrop,
    section
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    purgePrimitives: () => {
      dispatch(purgePrimitives());
    }
  };
};

const Constructor = withRouter(connect(
  mapStateToProps,
  mapDispatchProps
)(ConstructorTemplate));

export default Constructor;
