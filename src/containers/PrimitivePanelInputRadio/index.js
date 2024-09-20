import {connect} from 'react-redux';
import withRouter from '../../helpers/withRouter';

import {switchChild} from '../../store/actions';
import InputRadioTemplate from '../../components/atoms/InputRadio';

const mapDispatchProps = (
  dispatch,
  props
) => {
  return {
    onChange: (value) => {
      const {id, parentId, match} = props;
      const {section = 'playground'} = match?.params || {};
      const initialProps = {
        id,
        parentId,
        section
      };

      dispatch(switchChild(initialProps));
    }
  };
};

const PrimitiveInputRadio = withRouter(connect(
  null,
  mapDispatchProps
)(InputRadioTemplate));

export default PrimitiveInputRadio;
