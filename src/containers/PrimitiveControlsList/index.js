import {connect} from 'react-redux';

import ControlsListTemplate from '../../components/ControlsList';

const mapStateToProps = (state) => {
  return {
    items: state.primitiveControls
  };
};

const mapDispatchProps = (dispatch) => {

  return {
    onClick: (primitive) => {
      dispatch({
        type: 'ADD_PRIMITIVE',
        id: primitive.id,
        groupName: primitive.groupName,
        name: primitive.name,
        params: primitive.params,
        paramsValues: primitive.paramsValues,
        children: primitive.children
      });
    }
  };
};

const PrimitiveControlsList = connect(
  mapStateToProps,
  mapDispatchProps
)(ControlsListTemplate);

export default PrimitiveControlsList;
