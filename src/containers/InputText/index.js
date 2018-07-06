import {connect} from 'react-redux';
import InputTextTemplate from '../../components/InputText';

const mapDispatchProps = (
  dispatch,
  props
) => {
  return {
    onChange: (value) => {
      dispatch({
        type: 'CHANGE_PRIMITIVE_PROP',
        id: props.id,
        param: props.param,
        value: value
      });
    }
  };
};

const InputText = connect(
  null,
  mapDispatchProps
)(InputTextTemplate);

export default InputText;
