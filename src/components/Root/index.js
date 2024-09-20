import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '../../routes/Read/App';
import SinglePage from '../../routes/Read';
// import configureStore from '../../configureStore';

// const store = configureStore();

const Root = () => {
  const url = '/:section?/:id?';

  return (
    <Router>
      {/* <Provider store={store}> */}
      <Routes>
        {/* <Route
              path="/read"
              element={SinglePage}
            /> */}
        {/* <Route
              path={url}
              element={App}
            /> */}
        {/* <Route
              path='/'
              element={App}
            /> */}
        <Route path="/" element={<App />} />
      </Routes>
      {/* </Provider> */}
    </Router>
  );
};

export default Root;
