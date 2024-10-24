import { Dispatch } from 'redux';
import {
  changePrimitiveProp,
  changePrimitivePropType,
  togglePrimitiveProp,
} from '../../store/primitivesSlice';
import { Dependency, InitialProps } from './types';

interface UpdateTiedTypesArgs {
  initialProps: InitialProps;
  dispatch: Dispatch;
  propType: string;
}
export const updateTiedTypes = ({ initialProps, dispatch, propType }: UpdateTiedTypesArgs) => {
  if (!propType) {
    return null;
  }

  const typeProps = {
    ...initialProps,
    param: 'values',
    propType,
  };

  dispatch(changePrimitivePropType(typeProps));
};

interface UpdateTiedValuesArgs {
  initialProps: InitialProps;
  dispatch: Dispatch;
  newValue: string;
}

export const updateTiedValues = ({ initialProps, dispatch, newValue }: UpdateTiedValuesArgs) => {
  // const newValue = tiedValues[value];
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
        value: newValue,
      }),
    );
  }
};

interface UpdateDependenciesArgs {
  initialProps: InitialProps;
  dispatch: Dispatch;
  dependencies: Dependency[];
  value: string;
}

export const updateDependencies = ({
  initialProps,
  dispatch,
  dependencies,
  value,
}: UpdateDependenciesArgs) => {
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
};
