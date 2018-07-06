import {connect} from 'react-redux';
import InputSelectTemplate from '../../components/InputSelect';

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

const InputSelect = connect(
  null,
  mapDispatchProps
)(InputSelectTemplate);

export default InputSelect;
