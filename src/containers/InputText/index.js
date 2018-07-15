import {connect} from 'react-redux';

import {changePrimitiveProp} from '../../store/actions';
import InputTextTemplate from '../../components/InputText';

const mapDispatchProps = (
  dispatch,
  props
) => {
  return {
    onChange: (value) => {
      dispatch(changePrimitiveProp(props, value));
    }
  };
};

const InputText = connect(
  null,
  mapDispatchProps
)(InputTextTemplate);

export default InputText;
