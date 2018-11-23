import {connect} from 'react-redux';
import PropTypes from 'prop-types';
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
        const justEnabled = {};

        dependencies.forEach(oneDep => {
          let isDepsDisabled = value !== oneDep.value;
          const enable = oneDep.enable || [];
          const disable = oneDep.disable || [];

          if (oneDep.disable) {
            isDepsDisabled = !isDepsDisabled;
          }

          const listToHandle = [
            ...enable,
            ...disable
          ];

          listToHandle.forEach(depsItem => {
            const depsItemProps = {
              ...initialProps,
              param: depsItem,
              disabled: isDepsDisabled
            };

            if (isDepsDisabled === false) {
              justEnabled[depsItem] = depsItem;
            }

            if (isDepsDisabled === true) {
              // Prevent disabling just enabled items
              if (!justEnabled[depsItem]) {
                dispatch(toggleProp(depsItemProps));
              }
            } else {
              dispatch(toggleProp(depsItemProps));
            }
          });
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

const PrimitiveInputSelect = withRouter(connect(
  null,
  mapDispatchProps
)(InputSelectTemplate));

export default PrimitiveInputSelect;

PrimitiveInputSelect.propTypes = {
  id: PropTypes.string,
  param: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  secondValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  valuesList: PropTypes.array,
  parentId: PropTypes.string,
  tiedValues: PropTypes.object,
  tiedTypes: PropTypes.object,
  dependencies: PropTypes.array
};
