import {PropsWithChildren} from 'react';

import './Wrapper.scss';

/**
 * Common wrapper to control content width
 */
const Wrapper = ({children}: PropsWithChildren) => (
  <div className="Wrapper">
    {children}
  </div>
);

export default Wrapper;
