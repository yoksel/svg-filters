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

        // Override handling param
        const valueProps = {
          ...props,
          param: 'values'
        };

        // Disable/enable values
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

      if (props.tiedTypes) {
        const propType = props.tiedTypes[value];

        if (!propType) {
          return null;
        }

        const typeProps = {
          ...props,
          param: 'values'
        };

        dispatch({
          type: 'CHANGE_PROP_TYPE',
          ...typeProps,
          propType
        });
      }
    }
  };
};

const InputSelect = connect(
  null,
  mapDispatchProps
)(InputSelectTemplate);

export default InputSelect;
