import {connect} from 'react-redux';

import {deletePrimitive, duplicatePrimitive, togglePrimitive, updateIns} from '../../store/actions';

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
      dispatch(updateIns());
    },
    duplicatePrimitive: () => {
      dispatch(duplicatePrimitive(params));
    },
    togglePrimitive: () => {
      dispatch(togglePrimitive(params));
      dispatch(updateIns());
    }
  };
};

const PrimitivePanelControls = connect(
  null,
  mapDispatchProps
)(PrimitivePanelControlsTemplate);

export default PrimitivePanelControls;
