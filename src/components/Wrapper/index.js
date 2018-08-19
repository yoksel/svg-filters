import React from 'react';

import './Wrapper.css';

const Wrapper = ({children}) => {
  return (
    <div className="Wrapper">
      {children}
    </div>
  );
};

export default Wrapper;
