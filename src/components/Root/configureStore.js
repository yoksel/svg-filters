import {createStore} from 'redux';
import throttle from 'lodash/throttle';

import reducers from '../../store/reducers';
import {primitivesData, presetsData} from '../Data';
import {saveState, getState} from './localStorage';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;

  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
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
  const initialState = {
    presetControls: presetsData,
    primitiveControls: primitivesData,
    primitives: getState().primitives
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
      saveState({
        primitives: store.getState().primitives
      });
    }
  ), 1000);

  return store;
};

export default configureStore;
