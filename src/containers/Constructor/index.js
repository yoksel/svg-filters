import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {purgePrimitives, moveToPlayground} from '../../store/actions';

import ConstructorTemplate from '../../components/Constructor';

const mapStateToProps = (state, {match}) => {
  const {section = 'playground'} = match.params;

  return {
    primitives: state.primitives[section],
    dragDrop: state.dragDrop,
    section
  };
};

const mapDispatchProps = (dispatch, {match}) => {
  const {section = 'playground'} = match.params;

  return {
    purgePrimitives: () => {
      dispatch(purgePrimitives({section}));
    },
    moveToPlayground: () => {
      dispatch(moveToPlayground({section}));
    }
  };
};

const Constructor = withRouter(connect(
  mapStateToProps,
  mapDispatchProps
)(ConstructorTemplate));

export default Constructor;
