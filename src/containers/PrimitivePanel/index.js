import {connect} from 'react-redux';
import PrimitivePanelTemplate from '../../components/PrimitivePanel';

const mapDispatchProps = (
  dispatch,
  props
) => {
  return {
    startDrag: (params) => {
      dispatch({
        type: 'START_DRAG',
        ...params
      });
    }
  };
};

const PrimitivePanel = connect(
  null,
  mapDispatchProps
)(PrimitivePanelTemplate);

export default PrimitivePanel;
