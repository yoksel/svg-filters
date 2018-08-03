import {connect} from 'react-redux';

import {changePrimitiveProp} from '../../store/actions';

import InputTextareaTemplate from '../../components/InputTextarea';

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

const InputTextarea = connect(
  null,
  mapDispatchProps
)(InputTextareaTemplate);

export default InputTextarea;
