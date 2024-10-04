import { useDispatch } from 'react-redux';

import {
  changePrimitiveProp,
  changePrimitivePropType,
  togglePrimitiveProp,
} from '../../store/primitivesSlice';
import InputSelect from '../../components/atoms/InputSelect';
import useSection from '../../hooks/useSection';
import { isPrimitivesSection } from '../../store/types';

interface Dependency {
  enable: [];
  disable: [];
  value: string;
}

interface PrimitiveInputSelectContainerProps {
  id: string;
  param: string;
  value: string;
  secondValue: string;
  valuesList: string[];
  parentId: string;
  tiedValues: { [key: string]: string };
  tiedTypes: { [key: string]: string };
  dependencies: Dependency[];
}

const PrimitiveInputSelectContainer = ({
  // firstValue,
  secondValue,
  value,
  valuesList,
  id,
  parentId,
  param,
  dependencies,
  tiedValues,
  tiedTypes,
}: PrimitiveInputSelectContainerProps) => {
  const dispatch = useDispatch();
  const { section } = useSection();

  if (!isPrimitivesSection(section)) return null;

  return (
    <InputSelect
      secondValue={secondValue}
      // firstValue={firstValue}
      value={value}
      valuesList={valuesList}
      onChange={(value) => {
        const initialProps = {
          id,
          parentId,
          param,
          value,
          section,
        };

        // Change initial prop value
        dispatch(changePrimitiveProp(initialProps));

        // Enable/disable dependencies
        // k-attributes in composite
        if (dependencies) {
          const justEnabled: { [key: string]: string } = {};

          dependencies.forEach((oneDep) => {
            let isDepsDisabled = value !== oneDep.value;
            const enable = oneDep.enable || [];
            const disable = oneDep.disable || [];

            if (oneDep.disable) {
              isDepsDisabled = !isDepsDisabled;
            }

            const listToHandle = [...enable, ...disable];

            listToHandle.forEach((depsItem) => {
              const depsItemProps = {
                ...initialProps,
                param: depsItem,
                disabled: isDepsDisabled,
              };

              if (isDepsDisabled === false) {
                justEnabled[depsItem] = depsItem;
              }

              if (isDepsDisabled === true) {
                // Prevent disabling just enabled items
                if (!justEnabled[depsItem]) {
                  dispatch(togglePrimitiveProp(depsItemProps));
                }
              } else {
                dispatch(togglePrimitiveProp(depsItemProps));
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
            disabled,
          };

          // Disable/enable values
          dispatch(togglePrimitiveProp(valueProps));

          if (newValue !== 'disabled') {
            // Change prop value
            dispatch(
              changePrimitiveProp({
                ...valueProps,
                value: tiedValues[value],
              }),
            );
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
            propType,
          };

          dispatch(changePrimitivePropType(typeProps));
        }
      }}
    />
  );
};

export default PrimitiveInputSelectContainer;
