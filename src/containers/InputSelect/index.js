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

      if (props.tiedValues) {
        const newValue = props.tiedValues[value];

        if (!newValue) {
          return null;
        }

        const valueProps = {
          ...props,
          param: 'values'
        };

        if (newValue === 'disabled') {
          dispatch({
            type: 'TOGGLE_PROP',
            ...valueProps,
            disabled: true
          });
        } else {
          dispatch({
            type: 'TOGGLE_PROP',
            ...valueProps,
            disabled: false
          });

          dispatch(changePrimitiveProp(valueProps, props.tiedValues[value]));
        }
      }
    }
  };
};

const InputSelect = connect(
  null,
  mapDispatchProps
)(InputSelectTemplate);

export default InputSelect;
