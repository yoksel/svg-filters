import {connect} from 'react-redux';

import {changePrimitiveProp} from '../../store/actions';
import InputSelectTemplate from '../../components/InputSelect';

const mapDispatchProps = (
  dispatch,
  props
) => {
  return {
    onChange: (value) => {
      const {dependencies, tiedValues, tiedTypes} = props;

      // Change initial prop value
      dispatch(changePrimitiveProp(props, value));

      // Enable/disable dependencies
      if (dependencies) {
        let isDepsDisabled = value !== dependencies.value;
        const enable = dependencies.enable || [];
        const disable = dependencies.disable || [];

        if (dependencies.disable) {
          isDepsDisabled = !isDepsDisabled;
        }

        const listToHandle = [
          ...enable,
          ...disable
        ];

        listToHandle.map(depsItem => {
          const depsItemProps = {
            ...props,
            param: depsItem
          };

          dispatch({
            type: 'TOGGLE_PROP',
            ...depsItemProps,
            disabled: isDepsDisabled
          });
        });
      }

      // Change tied values
      if (tiedValues) {
        const newValue = tiedValues[value];
        const disabled = newValue === 'disabled';

        if (!newValue) {
          return null;
        }

        // Override handling param
        const valueProps = {
          ...props,
          param: 'values'
        };

        // Disable/enable values
        dispatch({
          type: 'TOGGLE_PROP',
          ...valueProps,
          disabled
        });

        if (newValue !== 'disabled') {
          // Change prop value
          dispatch(changePrimitiveProp(valueProps, tiedValues[value]));
        }
      }

      // Change tied types
      if (tiedTypes) {
        const propType = tiedTypes[value];

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
