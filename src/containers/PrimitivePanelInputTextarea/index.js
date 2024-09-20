import {connect} from 'react-redux';
import withRouter from '../../helpers/withRouter';

import {changePrimitiveProp} from '../../store/actions';

import InputTextareaTemplate from '../../components/atoms/InputTextarea';

const mapDispatchProps = (
  dispatch,
  props
) => {
  return {
    onChange: (value) => {
      const {id, parentId, param, match} = props;
      const {section = 'playground'} = match?.params || {};
      const initialProps = {
        id,
        parentId,
        param,
        value,
        section
      };
      dispatch(changePrimitiveProp(initialProps));
    }
  };
};

const PrimitivePanelInputTextarea = withRouter(connect(
  null,
  mapDispatchProps
)(InputTextareaTemplate));

export default PrimitivePanelInputTextarea;
