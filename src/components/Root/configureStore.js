import {createStore} from 'redux';
import throttle from 'lodash/throttle';

import deepClone from '../../helpers/deepClone';

import reducers from '../../store/reducers';
import {primitivesData, presetsData} from '../Data';
import {saveState, getState} from './localStorage';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;

  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    if (action.type === 'MOVE_DRAG') {
      return rawDispatch(action);
    }

    console.groupCollapsed(action.type);
    console.log('Before:', store.getState());
    console.log('Action:', action);
    const result = rawDispatch(action);
    console.log('After:', store.getState());
    console.groupEnd(action.type);

    return result;
  };
};

const configureStore = () => {
  const dataFromStorage = getState();
  const {primitives} = dataFromStorage;

  const initialState = {
    presetControls: presetsData,
    primitiveControls: primitivesData,
    primitives: primitives
  };

  const store = createStore(
    reducers,
    initialState
  );

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(throttle(
    () => {
      const primitivesToSave = deepClone(store.getState().primitives);
      primitivesToSave.swapSnapshot = '';

      saveState({
        primitives: primitivesToSave
      });
    }
  ), 1000);

  return store;
};

export default configureStore;
