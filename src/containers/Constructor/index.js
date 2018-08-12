import {connect} from 'react-redux';

import {purgePrimitives} from '../../store/actions';

import ConstructorTemplate from '../../components/Constructor';

const mapStateToProps = (state) => {
  return {
    primitives: state.primitives.list,
    dragDrop: state.dragDrop
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    purgePrimitives: () => {
      dispatch(purgePrimitives());
    }
  };
};

const Constructor = connect(
  mapStateToProps,
  mapDispatchProps
)(ConstructorTemplate);

export default Constructor;
