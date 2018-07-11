import {connect} from 'react-redux';

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
      params.type = 'DELETE_PRIMITIVE';

      dispatch(params);
    },
    duplicatePrimitive: () => {
      params.type = 'DUPLICATE_PRIMITIVE';

      dispatch(params);
    }
  };
};

const PrimitivePanelControls = connect(
  null,
  mapDispatchProps
)(PrimitivePanelControlsTemplate);

export default PrimitivePanelControls;
