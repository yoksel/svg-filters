import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {changePrimitiveProp, changePropType, toggleProp} from '../../store/actions';
import InputSelectTemplate from '../../components/InputSelect';

const mapDispatchProps = (
  dispatch,
  props
) => {
  return {
    onChange: (value) => {
      const {id, parentId, param, dependencies, tiedValues, tiedTypes, match} = props;
      const {section = 'playground'} = match.params;

      const initialProps = {
        id,
        parentId,
        param,
        value,
        section
      };

      // Change initial prop value
      dispatch(changePrimitiveProp(initialProps));

      // Enable/disable dependencies
      // k-attributes in composite
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
            ...initialProps,
            param: depsItem,
            disabled: isDepsDisabled
          };

          dispatch(toggleProp(depsItemProps));
        });
      }

      // Change tied values
      // colormatrix
      if (tiedValues) {
        const newValue = tiedValues[value];
        const disabled = newValue === 'disabled';

        if (!newValue) {
          return null;
        }

        // Override handling param
        const valueProps = {
          ...initialProps,
          param: 'values',
          disabled
        };

        // Disable/enable values
        dispatch(toggleProp(valueProps));

        if (newValue !== 'disabled') {
          // Change prop value
          dispatch(changePrimitiveProp({
            ...valueProps,
            value: tiedValues[value]
          }));
        }
      }

      // Change tied types
      // matrix in colormatrix
      if (tiedTypes) {
        const propType = tiedTypes[value];

        if (!propType) {
          return null;
        }

        const typeProps = {
          ...initialProps,
          param: 'values',
          propType
        };

        dispatch(changePropType(typeProps));
      }
    }
  };
};

const InputSelect = withRouter(connect(
  null,
  mapDispatchProps
)(InputSelectTemplate));

export default InputSelect;
