import {createStore} from 'redux';
import throttle from 'lodash/throttle';
import reducers from './store/reducers';
import {primitivesData, presetsData} from './data';
import {saveState, getState} from './components/Root/localStorage';

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
  const {primitives, playground} = dataFromStorage;

  const initialState = {
    presetControls: presetsData,
    primitiveControls: primitivesData,
    primitives,
    playground
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
      const playgroundToSave = structuredClone(store.getState().playground);
      const primitivesToSave = structuredClone(store.getState().primitives);
      const primitivesCleared = {
        ...primitivesToSave,
        playground: primitivesToSave.playground,
        presets: [],
        docs: []
      };

      saveState({
        primitives: primitivesCleared,
        playground: playgroundToSave
      });
    }
  ), 1000);

  return store;
};

export default configureStore;
