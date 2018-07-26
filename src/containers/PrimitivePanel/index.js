import {connect} from 'react-redux';

import {startDrag} from '../../store/actions';

import PrimitivePanelTemplate from '../../components/PrimitivePanel';

const mapDispatchProps = (
  dispatch,
  props
) => {
  return {
    startDrag: (params) => {
      dispatch(startDrag(params));
    }
  };
};

const PrimitivePanel = connect(
  null,
  mapDispatchProps
)(PrimitivePanelTemplate);

export default PrimitivePanel;
