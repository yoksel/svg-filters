import {connect} from 'react-redux';

import PrimitiveControlsListTemplate from '../../components/PrimitiveControlsList';

const mapStateToProps = (state) => {
  return {
    primitiveControls: state.primitiveControls
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
        paramsValues: primitive.paramsValues
      });
    }
  };
};

const PrimitiveControlsList = connect(
  mapStateToProps,
  mapDispatchProps
)(PrimitiveControlsListTemplate);

export default PrimitiveControlsList;
