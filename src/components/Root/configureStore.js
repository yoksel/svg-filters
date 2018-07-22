import {createStore} from 'redux';
import reducers from '../../store/reducers';

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
  const store = createStore(reducers);

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  return store;
};

export default configureStore;
