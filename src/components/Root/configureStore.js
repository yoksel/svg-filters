import {createStore} from 'redux';
import reducers from '../../store/reducers';

const configureStore = () => {
  const store = createStore(reducers);

  return store;
};

export default configureStore;
