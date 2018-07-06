import {connect} from 'react-redux';

import PrimitivePanelControlsTemplate from '../../components/PrimitivePanelControls';

const mapDispatchProps = (
  dispatch,
  props
) => {
  return {
    removePrimitive: () => {
      dispatch({
        type: 'DELETE_PRIMITIVE',
        id: props.id
      });
    },
    duplicatePrimitive: () => {
      dispatch({
        type: 'DUPLICATE_PRIMITIVE',
        id: props.id
      });
    }
  };
};

const PrimitivePanelControls = connect(
  null,
  mapDispatchProps
)(PrimitivePanelControlsTemplate);

export default PrimitivePanelControls;
