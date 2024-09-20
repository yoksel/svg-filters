import {PropsWithChildren} from 'react';

import './Wrapper.scss';

/**
 * Page content wrapper
 */
const Wrapper = ({children}: PropsWithChildren) => (
  <div className="Wrapper">
    {children}
  </div>
);

export default Wrapper;
