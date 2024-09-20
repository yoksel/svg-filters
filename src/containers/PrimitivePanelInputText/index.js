import {connect} from 'react-redux';
import withRouter from '../../helpers/withRouter';

import {changePrimitiveProp} from '../../store/actions';
import InputTextTemplate from '../../components/atoms/InputText';

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

const PrimitivePanelInputText = withRouter(connect(
  null,
  mapDispatchProps
)(InputTextTemplate));

export default PrimitivePanelInputText;
