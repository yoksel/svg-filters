import {connect} from 'react-redux';

import {deletePrimitive, duplicatePrimitive} from '../../store/actions';

import PrimitivePanelControlsTemplate from '../../components/PrimitivePanelControls';

const mapDispatchProps = (
  dispatch,
  props
) => {
  let params = {
    id: props.id
  };

  if (props.parentId) {
    params = {
      id: props.parentId,
      childId: props.id
    };
  }

  return {
    removePrimitive: () => {
      dispatch(deletePrimitive(params));
    },
    duplicatePrimitive: () => {

      dispatch(duplicatePrimitive(params));
    }
  };
};

const PrimitivePanelControls = connect(
  null,
  mapDispatchProps
)(PrimitivePanelControlsTemplate);

export default PrimitivePanelControls;
