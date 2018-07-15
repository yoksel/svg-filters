import {connect} from 'react-redux';

import {changePrimitiveProp} from '../../store/actions';
import InputSelectTemplate from '../../components/InputSelect';

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

const InputSelect = connect(
  null,
  mapDispatchProps
)(InputSelectTemplate);

export default InputSelect;
